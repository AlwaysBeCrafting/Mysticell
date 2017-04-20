import { Connection, Connector } from 'data/common';
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
	payload: { connection: Connection };
}

export const connectNode = ( connection: Connection ): ConnectNodeAction => ({
	type: ActionTypes.CONNECT_NODE,
	payload: { connection },
});


interface DisconnectNodeAction {
	readonly type: typeof ActionTypes.DISCONNECT_NODE;
	payload: { connection: Connection };
}

export const disconnectNode = ( connection: Connection ): DisconnectNodeAction => ({
	type: ActionTypes.DISCONNECT_NODE,
	payload: { connection },
});


interface UpdateNodeAction {
	readonly type: typeof ActionTypes.UPDATE_NODE;
	payload: { pin: Connector, value: string };
}

export const updateNode = ( pin: Connector, value: string ): UpdateNodeAction => ({
	type: ActionTypes.UPDATE_NODE,
	payload: { pin, value },
});


export type Action =
	| CreateNodeAction
	| DeleteNodeAction
	| ConnectNodeAction
	| DisconnectNodeAction
	| UpdateNodeAction;

