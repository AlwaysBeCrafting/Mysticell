import { Node } from "./model";


const ActionTypes = {
	CREATE:          "[Node] Create",
	DESTROY:         "[Node] Destroy",
	SET_INPUT_VALUE: "[Node] Set input value",
};
type Action =
	| CreateAction
	| DestroyAction
	| SetInputValueAction;

interface CreateAction {
	readonly type: typeof ActionTypes.CREATE;
	payload: { node: Node };
}
const create = (node: Node): CreateAction => ({
	type: ActionTypes.CREATE,
	payload: { node },
});

interface DestroyAction {
	readonly type: typeof ActionTypes.DESTROY;
	payload: { nodeId: string };
}
const destroy = (nodeId: string): DestroyAction => ({
	type: ActionTypes.DESTROY,
	payload: { nodeId },
});

interface SetInputValueAction {
	readonly type: typeof ActionTypes.SET_INPUT_VALUE;
	payload: { nodeId: string, index: number, value: string };
}
const setInputValue = (nodeId: string, index: number, value: string): SetInputValueAction => ({
	type: ActionTypes.SET_INPUT_VALUE,
	payload: { nodeId, index, value },
});


export { Action, ActionTypes };
export { create, destroy, setInputValue };
