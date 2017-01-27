import { Position } from "data/shared";
import { NodeState } from "redux/state";


export class ActionTypes {
	static readonly ADD_NODE             = "[Nodes] Add";
	static readonly REMOVE_NODE          = "[Nodes] Remove";
	static readonly MOVE_NODE            = "[Nodes] Move";
	static readonly CONNECT_NODE         = "[Nodes] Connect";
	static readonly DISCONNECT_NODE      = "[Nodes] Disconnect";
	static readonly SET_NODE_INPUT_VALUE = "[Nodes] Set input value";
	static readonly UPDATE_NODE          = "[Nodes] Update";
};


export class AddNodeAction {
	readonly type = ActionTypes.ADD_NODE;
	constructor ( public payload: { fieldId: number, node: NodeState }) {};
}
export const addNode = ( fieldId: number, node: NodeState ): AddNodeAction => ({
	...new AddNodeAction({ fieldId, node }),
});


export class RemoveNodeAction {
	readonly type = ActionTypes.REMOVE_NODE;
	constructor ( public payload: { nodeId: number }) {};
}
export const removeNode = ( nodeId: number ): RemoveNodeAction => ({
	...new RemoveNodeAction({ nodeId }),
});


export class MoveNodeAction {
	readonly type = ActionTypes.MOVE_NODE;
	constructor ( public payload: { nodeId: number, position: Position }) {};
}
export const moveNode = ( nodeId: number, position: Position ): MoveNodeAction => ({
	...new MoveNodeAction({ nodeId, position }),
});


export class ConnectNodeAction {
	readonly type = ActionTypes.CONNECT_NODE;
	constructor ( public payload: { fromNodeId: number, toNodeId: number, toIndex: number }) {};
}
export const connectNode = ( fromNodeId: number, toNodeId: number, toIndex: number ): ConnectNodeAction => ({
	...new ConnectNodeAction({ fromNodeId, toNodeId, toIndex }),
});


export class DisconnectNodeAction {
	readonly type = ActionTypes.DISCONNECT_NODE;
	constructor ( public payload: { nodeId: number, index: number }) {};
}
export const disconnectNode = ( nodeId: number, index: number ): DisconnectNodeAction => ({
	...new DisconnectNodeAction({ nodeId, index }),
});


export class UpdateNodeAction {
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
