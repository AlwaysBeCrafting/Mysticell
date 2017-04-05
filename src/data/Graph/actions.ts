import { Graph } from './model';


class ActionTypes {
	static readonly CREATE_NODE          = "[Graph] Create";
	static readonly DELETE_NODE          = "[Graph] Delete";
	static readonly CONNECT_NODE         = "[Graph] Connect";
	static readonly DISCONNECT_NODE      = "[Graph] Disconnect";
	static readonly SET_NODE_INPUT_VALUE = "[Graph] Set input value";
	static readonly UPDATE_NODE          = "[Graph] Update";
};


class CreateNodeAction {
	readonly type = ActionTypes.CREATE_NODE;
	constructor ( public payload: {  }) {};
}
export const createNode = ( fieldId: number, node: Node ): CreateNodeAction => ({
	...new CreateNodeAction({ fieldId, node }),
});


class DeleteNodeAction {
	readonly type = ActionTypes.DELETE_NODE;
	constructor ( public payload: { nodeId: number }) {};
}
export const deleteNode = ( nodeId: number ): DeleteNodeAction => ({
	...new DeleteNodeAction({ nodeId }),
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
	CreateNodeAction     |
	DeleteNodeAction     |
	ConnectNodeAction    |
	DisconnectNodeAction |
	UpdateNodeAction;


export default ( state = new Map(), action: Action ): Graph => {
	switch ( action.type ) {

		case ActionTypes.CREATE_NODE:
			// Create a new node
			return new Map( state ); //.set( newNode.id, newNode );

		case ActionTypes.DELETE_NODE:
			const copiedGraph = new Map( state );
			copiedGraph.delete( action.payload.nodeId );
			return copiedGraph;

		case ActionTypes.CONNECT_NODE:
			// Create connected node copy
			return new Map( state ); //.set( connectedNode.id, connectedNode );

		case ActionTypes.DISCONNECT_NODE:
			// Create disconnected node copy
			return new Map( state ); //.set( disconnectedNode.id, disconnectedNode );

		case ActionTypes.UPDATE_NODE:
			// Do all the heavy lifting
			return new Map( state );

		default: return state;
	}
};
