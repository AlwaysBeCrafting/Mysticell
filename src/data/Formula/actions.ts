import {Formula} from "./model";


const enum ActionTypes {
	CREATE      = "[Function] Create",
	DESTROY     = "[Function] Destroy",
	ADD_NODE    = "[Function] Add node",
	REMOVE_NODE = "[Function] Remove node",
}
type Action =
	| CreateAction
	| DestroyAction
	| AddNodeAction
	| RemoveNodeAction;

interface CreateAction {
	readonly type: ActionTypes.CREATE;
	payload: {fxn: Formula};
}
const create = (fxn: Formula): CreateAction => ({
	type: ActionTypes.CREATE,
	payload: {fxn},
});

interface DestroyAction {
	readonly type: ActionTypes.DESTROY;
	payload: {fxnId: string};
}
const destroy = (fxnId: string): DestroyAction => ({
	type: ActionTypes.DESTROY,
	payload: {fxnId},
});

interface AddNodeAction {
	readonly type: ActionTypes.ADD_NODE;
	payload: {functionId: string, nodeId: string};
}
const addNode = (functionId: string, nodeId: string): AddNodeAction => ({
	type: ActionTypes.ADD_NODE,
	payload: {functionId, nodeId},
});

interface RemoveNodeAction {
	readonly type: ActionTypes.REMOVE_NODE;
	payload: {functionId: string, nodeId: string};
}
const removeNode = (functionId: string, nodeId: string): RemoveNodeAction => ({
	type: ActionTypes.REMOVE_NODE,
	payload: {functionId, nodeId},
});


export {Action, ActionTypes};
export {create, destroy, addNode, removeNode};
