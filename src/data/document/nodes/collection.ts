import { Node } from "common/types";
import { Position } from "common/types/layout";


class ActionTypes {
	static readonly ADD_NODE             = "[Nodes] Add";
	static readonly REMOVE_NODE          = "[Nodes] Remove";
	static readonly MOVE_NODE            = "[Nodes] Move";
	static readonly CONNECT_NODE         = "[Nodes] Connect";
	static readonly DISCONNECT_NODE      = "[Nodes] Disconnect";
	static readonly SET_NODE_INPUT_VALUE = "[Nodes] Set input value";
	static readonly UPDATE_NODE          = "[Nodes] Update";
};


class AddNodeAction {
	readonly type = ActionTypes.ADD_NODE;
	constructor ( public payload: { fieldId: number, node: Node }) {};
}
export const addNode = ( fieldId: number, node: Node ): AddNodeAction => ({
	...new AddNodeAction({ fieldId, node }),
});


class RemoveNodeAction {
	readonly type = ActionTypes.REMOVE_NODE;
	constructor ( public payload: { nodeId: number }) {};
}
export const removeNode = ( nodeId: number ): RemoveNodeAction => ({
	...new RemoveNodeAction({ nodeId }),
});


class MoveNodeAction {
	readonly type = ActionTypes.MOVE_NODE;
	constructor ( public payload: { nodeId: number, position: Position }) {};
}
export const moveNode = ( nodeId: number, position: Position ): MoveNodeAction => ({
	...new MoveNodeAction({ nodeId, position }),
});


class ConnectNodeAction {
	readonly type = ActionTypes.CONNECT_NODE;
	constructor ( public payload: { fromNodeId: number, toNodeId: number, toIndex: number }) {};
}
export const connectNode = ( fromNodeId: number, toNodeId: number, toIndex: number ): ConnectNodeAction => ({
	...new ConnectNodeAction({ fromNodeId, toNodeId, toIndex }),
});


class DisconnectNodeAction {
	readonly type = ActionTypes.DISCONNECT_NODE;
	constructor ( public payload: { nodeId: number, index: number }) {};
}
export const disconnectNode = ( nodeId: number, index: number ): DisconnectNodeAction => ({
	...new DisconnectNodeAction({ nodeId, index }),
});


class UpdateNodeAction {
	readonly type = ActionTypes.UPDATE_NODE;
	constructor ( public payload: { nodeId: number, inputIndex: number, inputValue?: number|string }) {};
}
export const updateNode = ( nodeId: number, inputIndex: number, inputValue?: number|string ): UpdateNodeAction => ({
	...new UpdateNodeAction({ nodeId, inputIndex, inputValue }),
});


export type Action =
	AddNodeAction        |
	RemoveNodeAction     |
	MoveNodeAction       |
	ConnectNodeAction    |
	DisconnectNodeAction |
	UpdateNodeAction;


type NodeMap = Map<number, Node>;

export default ( state = new Map(), action: Action ): NodeMap => {
	switch ( action.type ) {

		case ActionTypes.ADD_NODE:
			const addedNode = action.payload.node;
			return new Map( state ).set( addedNode.id, addedNode );

		case ActionTypes.REMOVE_NODE:
			const removedNode = state.get( action.payload.nodeId );
			if ( !removedNode ) { return state; }
			const clonedState = new Map( state );
			clonedState.delete( removedNode.id );
			return clonedState;

		case ActionTypes.MOVE_NODE:
			const movedNode = state.get( action.payload.nodeId );
			if ( !movedNode ) { return state; }
			return new Map( state ).set(
				movedNode.id,
				{
					...movedNode,
					position: action.payload.position,
				},
			);

		case ActionTypes.CONNECT_NODE:
			const connectedFrom = state.get( action.payload.fromNodeId );
			const connectedTo = state.get( action.payload.toNodeId );
			const connectedIndex = action.payload.toIndex;
			if ( !connectedFrom || !connectedTo ) { return state; }

			const connectedToClone = {
				...connectedTo,
				inputNodes: [ ...connectedTo.inputNodes ],
			};
			connectedToClone.inputNodes[connectedIndex] = connectedFrom.id;
			return new Map( state ).set( connectedToClone.id, connectedToClone );

		case ActionTypes.DISCONNECT_NODE:
			const disconnectedIndex = action.payload.index;
			const disconnectedNode = state.get( action.payload.nodeId );
			if ( !disconnectedNode ) { return state; }

			const disconnectedNodeClone = {
				...disconnectedNode,
				inputNodes: [ ...disconnectedNode.inputNodes ],
			};
			delete disconnectedNodeClone.inputNodes[disconnectedIndex];
			return new Map( state ).set( disconnectedNodeClone.id, disconnectedNodeClone );

		case ActionTypes.UPDATE_NODE:
			const updatedNode = state.get( action.payload.nodeId );
			if ( !updatedNode ) { return state; }
			const updatedNodeClone = {
				...updatedNode,
				inputValues: updatedNode.inputValues,
			};
			const inVal = action.payload.inputValue;
			updatedNode.inputValues[action.payload.inputIndex] = castInputValue( inVal );
			const returnVal = updateNodeAndDependents( state, updatedNode );
			return returnVal;

		default: return state;
	}
};

const castInputValue = ( value ): number|string|undefined => {
	if ( value === "" ) { return ""; }
	if ( !Number.isNaN( +value )) { return +value; }
	return value;
};

const updateNodeAndDependents = ( nodes: NodeMap, currentNode: Node ): NodeMap => {
	const inputValues = currentNode.inputNodes
		.map(( nodeId, i ) => {
			const inputNode = nodeId && nodes.get( nodeId );
			return inputNode ? inputNode.outputValue : currentNode.inputValues[i];
		});

	const outputValue = currentNode.fxn.exec( ...inputValues );

	return getConnectedNodes( nodes, currentNode ).reduce(
			updateNodeAndDependents,
			new Map( nodes ).set( currentNode.id, { ...currentNode, inputValues, outputValue }),
		);
};

const getConnectedNodes = ( nodes: NodeMap, currentNode: Node ): Node[] => {
	return Array.from( nodes )
		.filter(([ id, node ]) => node.inputNodes.find( inputId => !!inputId && ( inputId === currentNode.id )))
		.map(([ id, node ]) => node );
};
