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
	constructor ( public payload: { node: NodeState }) {};
}
export const removeNode = ( node: NodeState ): RemoveNodeAction => ({
	...new RemoveNodeAction({ node }),
});


export class MoveNodeAction {
	readonly type = ActionTypes.MOVE_NODE;
	constructor ( public payload: { node: NodeState, position: Position }) {};
}
export const moveNode = ( node: NodeState, position: Position ): MoveNodeAction => ({
	...new MoveNodeAction({ node, position }),
});


export class ConnectNodeAction {
	readonly type = ActionTypes.CONNECT_NODE;
	constructor ( public payload: { fromNode: NodeState, toNode: NodeState, toIndex: number }) {};
}
export const connectNode = ( fromNode: NodeState, toNode: NodeState, toIndex: number ): ConnectNodeAction => ({
	...new ConnectNodeAction({ fromNode, toNode, toIndex }),
});


export class DisconnectNodeAction {
	readonly type = ActionTypes.DISCONNECT_NODE;
	constructor ( public payload: { node: NodeState, index: number }) {};
}
export const disconnectNode = ( node: NodeState, index: number ): DisconnectNodeAction => ({
	...new DisconnectNodeAction({ node, index }),
});


export class UpdateNodeAction {
	readonly type = ActionTypes.UPDATE_NODE;
	constructor ( public payload: { node: NodeState, inputIndex: number, inputValue?: number|string }) {};
}
export const updateNode = ( node: NodeState, inputIndex: number, inputValue?: number|string ): UpdateNodeAction => ({
	...new UpdateNodeAction({ node, inputIndex, inputValue }),
});


export type Actions =
	AddNodeAction        |
	RemoveNodeAction     |
	MoveNodeAction       |
	ConnectNodeAction    |
	DisconnectNodeAction |
	UpdateNodeAction;
