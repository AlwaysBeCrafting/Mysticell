import { ConnectedParamSource, ValueParamSource } from 'data/common';
import { UserNode } from 'data/Node/model';


export namespace ActionTypes {
	export const CREATE_NODE          = '[Graph] Create';
	export const DELETE_NODE          = '[Graph] Delete';
	export const CONNECT_NODE         = '[Graph] Connect';
	export const DISCONNECT_NODE      = '[Graph] Disconnect';
	export const SET_NODE_INPUT_VALUE = '[Graph] Set input value';
	export const UPDATE_NODE          = '[Graph] Update';
}


interface CreateNodeAction {
	readonly type: typeof ActionTypes.CREATE_NODE;
	payload: { node: UserNode };
}

export const createNode = ( node: UserNode ): CreateNodeAction => ({
	type: ActionTypes.CREATE_NODE,
	payload: { node },
});


interface DeleteNodeAction {
	readonly type: typeof ActionTypes.DELETE_NODE;
	payload: { nodeId: string };
}

export const deleteNode = ( nodeId: string ): DeleteNodeAction => ({
	type: ActionTypes.DELETE_NODE,
	payload: { nodeId },
});


interface ConnectNodeAction {
	readonly type: typeof ActionTypes.CONNECT_NODE;
	payload: { id: string, index: number, source: ConnectedParamSource };
}

export const connectNode = ( id: string, index: number, source: ConnectedParamSource ): ConnectNodeAction => ({
	type: ActionTypes.CONNECT_NODE,
	payload: { id, index, source },
});


interface DisconnectNodeAction {
	readonly type: typeof ActionTypes.DISCONNECT_NODE;
	payload: { id: string, index: number };
}

export const disconnectNode = ( id: string, index: number ): DisconnectNodeAction => ({
	type: ActionTypes.DISCONNECT_NODE,
	payload: { id, index },
});


interface UpdateNodeAction {
	readonly type: typeof ActionTypes.UPDATE_NODE;
	payload: { id: string, index: number, value: ValueParamSource };
}

export const updateNode = ( id: string, index: number, value: ValueParamSource ): UpdateNodeAction => ({
	type: ActionTypes.UPDATE_NODE,
	payload: { id, index, value },
});


export type Action =
	| CreateNodeAction
	| DeleteNodeAction
	| ConnectNodeAction
	| DisconnectNodeAction
	| UpdateNodeAction;

