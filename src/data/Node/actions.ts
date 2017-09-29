import { TypedAction } from "data/common";

import { Node } from "./model";


const enum ActionTypes {
	CREATE         = "[Node] Create",
	DESTROY        = "[Node] Destroy",
	SET_USER_VALUE = "[Node] Set user value",

	SET_USER_VALUE_ASYNC = "[Node/Async] Set user value",
}
type Action =
	| CreateAction
	| DestroyAction
	| SetUserValueAction

	| SetUserValueAsyncAction;

interface CreateAction extends TypedAction<ActionTypes.CREATE> {
	payload: {node: Node};
}
const create = (node: Node): Action => ({
	type: ActionTypes.CREATE,
	payload: {node},
});

interface DestroyAction extends TypedAction<ActionTypes.DESTROY> {
	payload: {nodeId: string};
}
const destroy = (nodeId: string): Action => ({
	type: ActionTypes.DESTROY,
	payload: {nodeId},
});

interface SetUserValueAction extends TypedAction<ActionTypes.SET_USER_VALUE> {
	payload: {nodeId: string, index: number, value: string};
}
const setUserValue = (nodeId: string, index: number, value: string): Action => ({
	type: ActionTypes.SET_USER_VALUE,
	payload: {nodeId, index, value},
});

interface SetUserValueAsyncAction extends TypedAction<ActionTypes.SET_USER_VALUE_ASYNC> {
	payload: {nodeId: string, index: number, value: string};
}
const setUserValueAsync = (nodeId: string, index: number, value: string): Action => ({
	type: ActionTypes.SET_USER_VALUE_ASYNC,
	payload: {nodeId, index, value},
});


export {Action, ActionTypes};
export {create, destroy, setUserValue};
export {setUserValueAsync};
