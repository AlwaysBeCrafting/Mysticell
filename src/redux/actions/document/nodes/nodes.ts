import { Node } from "data";
import { Position } from "data/shared";


export class ActionTypes {
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


export type Actions =
	AddNodeAction        |
	RemoveNodeAction     |
	MoveNodeAction       |
	ConnectNodeAction    |
	DisconnectNodeAction |
	UpdateNodeAction;
