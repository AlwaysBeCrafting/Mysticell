import { TypedAction } from "data/common";

import { Formula } from "./model";


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

interface CreateAction extends TypedAction<ActionTypes.CREATE> {
	payload: {fxn: Formula};
}
const create = (fxn: Formula): Action => ({
	type: ActionTypes.CREATE,
	payload: {fxn},
});

interface DestroyAction extends TypedAction<ActionTypes.DESTROY> {
	payload: {fxnId: string};
}
const destroy = (fxnId: string): Action => ({
	type: ActionTypes.DESTROY,
	payload: {fxnId},
});

interface AddNodeAction extends TypedAction<ActionTypes.ADD_NODE> {
	payload: {functionId: string, nodeId: string};
}
const addNode = (functionId: string, nodeId: string): Action => ({
	type: ActionTypes.ADD_NODE,
	payload: {functionId, nodeId},
});

interface RemoveNodeAction extends TypedAction<ActionTypes.REMOVE_NODE> {
	payload: {functionId: string, nodeId: string};
}
const removeNode = (functionId: string, nodeId: string): Action => ({
	type: ActionTypes.REMOVE_NODE,
	payload: {functionId, nodeId},
});


export {Action, ActionTypes};
export {create, destroy, addNode, removeNode};
