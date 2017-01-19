import { Position } from "data/shared";
import { NodeState } from "redux/state";

export class ActionTypes {
	static readonly ADD_NODE        = "[Nodes] Add";
	static readonly REMOVE_NODE     = "[Nodes] Remove";
	static readonly MOVE_NODE       = "[Nodes] Move";
	static readonly CONNECT_NODE    = "[Nodes] Connect";
	static readonly DISCONNECT_NODE = "[Nodes] Disconnect";
}

export class AddNodeAction {
	type = ActionTypes.ADD_NODE;
	payload: { fieldId: number, node: NodeState };
}
export const addNode = ( fieldId: number, node: NodeState ): AddNodeAction => ({
	type: ActionTypes.ADD_NODE,
	payload: { fieldId, node },
});


export class RemoveNodeAction {
	type = ActionTypes.REMOVE_NODE;
	payload: { node: NodeState };
}
export const removeNode = ( node: NodeState ): RemoveNodeAction => ({
	type: ActionTypes.REMOVE_NODE,
	payload: { node },
});


export class MoveNodeAction {
	type = ActionTypes.MOVE_NODE;
	payload: { node: NodeState, position: Position };
}
export const moveNode = ( node: NodeState, position: Position ): MoveNodeAction => ({
	type: ActionTypes.MOVE_NODE,
	payload: { node, position },
});


export class ConnectNodeAction {
	type = ActionTypes.CONNECT_NODE;
	payload: { fromNode: NodeState, toNode: NodeState, toIndex: number };
}
export const connectNode = ( fromNode: NodeState, toNode: NodeState, toIndex: number ): ConnectNodeAction => ({
	type: ActionTypes.CONNECT_NODE,
	payload: { fromNode, toNode, toIndex },
});


export class DisconnectNodeAction {
	type = ActionTypes.DISCONNECT_NODE;
	payload: { node: NodeState, index: number };
}
export const disconnectNode = ( node: NodeState, index: number ): DisconnectNodeAction => ({
	type: ActionTypes.DISCONNECT_NODE,
	payload: { node, index },
});


export type Actions =
	AddNodeAction     |
	RemoveNodeAction  |
	MoveNodeAction    |
	ConnectNodeAction |
	DisconnectNodeAction;
