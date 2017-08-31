import {Formula} from "./model";


namespace ActionTypes {
	export const CREATE      = "[Function] Create";
	export const DESTROY     = "[Function] Destroy";
	export const ADD_NODE    = "[Function] Add node";
	export const REMOVE_NODE = "[Function] Remove node";
}
type Action =
	| CreateAction
	| DestroyAction
	| AddNodeAction
	| RemoveNodeAction;

interface CreateAction {
	readonly type: typeof ActionTypes.CREATE;
	payload: {fxn: Formula};
}
const create = (fxn: Formula): CreateAction => ({
	type: ActionTypes.CREATE,
	payload: {fxn},
});

interface DestroyAction {
	readonly type: typeof ActionTypes.DESTROY;
	payload: {fxnId: string};
}
const destroy = (fxnId: string): DestroyAction => ({
	type: ActionTypes.DESTROY,
	payload: {fxnId},
});

interface AddNodeAction {
	readonly type: typeof ActionTypes.ADD_NODE;
	payload: {functionId: string, nodeId: string};
}
const addNode = (functionId: string, nodeId: string): AddNodeAction => ({
	type: ActionTypes.ADD_NODE,
	payload: {functionId, nodeId},
});

interface RemoveNodeAction {
	readonly type: typeof ActionTypes.REMOVE_NODE;
	payload: {functionId: string, nodeId: string};
}
const removeNode = (functionId: string, nodeId: string): RemoveNodeAction => ({
	type: ActionTypes.REMOVE_NODE,
	payload: {functionId, nodeId},
});


export {Action, ActionTypes};
export {create, destroy, addNode, removeNode};
