import * as nodes from "redux/actions/nodes";
import { NodeState } from "redux/state";

const initialState: Map<number, NodeState> = new Map();

export const reducer = (
	state = initialState,
	action: nodes.Actions,
): Map<number, NodeState> => {
	switch ( action.type ) {

		case nodes.ActionTypes.ADD_NODE:
			const addedNode = action.payload.node;
			return new Map( state ).set( addedNode.id, addedNode );

		case nodes.ActionTypes.REMOVE_NODE:
			const removedNode = state.get( action.payload.nodeId );
			if ( !removedNode ) { return state; }
			const clonedState = new Map( state );
			clonedState.delete( removedNode.id );
			return clonedState;

		case nodes.ActionTypes.MOVE_NODE:
			const movedNode = state.get( action.payload.nodeId );
			if ( !movedNode ) { return state; }
			return new Map( state ).set(
				movedNode.id,
				{
					...movedNode,
					position: action.payload.position,
				},
			);

		case nodes.ActionTypes.CONNECT_NODE:
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

		case nodes.ActionTypes.DISCONNECT_NODE:
			const disconnectedIndex = action.payload.index;
			const disconnectedNode = state.get( action.payload.nodeId );
			if ( !disconnectedNode ) { return state; }

			const disconnectedNodeClone = {
				...disconnectedNode,
				inputNodes: [ ...disconnectedNode.inputNodes ],
			};
			delete disconnectedNodeClone.inputNodes[disconnectedIndex];
			return new Map( state ).set( disconnectedNodeClone.id, disconnectedNodeClone );

		case nodes.ActionTypes.UPDATE_NODE:
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

const updateNodeAndDependents = ( nodes: Map<number, NodeState>, currentNode: NodeState ): Map<number, NodeState> => {
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

const getConnectedNodes = ( nodes: Map<number, NodeState>, currentNode: NodeState ): NodeState[] => {
	return Array.from( nodes )
		.filter(([ id, node ]) => node.inputNodes.find( inputId => !!inputId && ( inputId === currentNode.id )))
		.map(([ id, node ]) => node );
};
