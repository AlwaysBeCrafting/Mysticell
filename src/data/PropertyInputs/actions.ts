const enum ActionTypes {
	SET_VALUE = "[PropertyInputs] Set value",

	SET_VALUE_ASYNC = "[PropertyInputs/Async] Set value",
}
type Action =
	| SetValueAction

	| SetValueAsyncAction;

interface SetValueAction {
	readonly type: ActionTypes.SET_VALUE;
	readonly payload: { propertyId: string, index: number, value: string };
}
const setValue = (propertyId: string, index: number, value: string): Action => ({
	type: ActionTypes.SET_VALUE,
	payload: { propertyId, index, value },
});

interface SetValueAsyncAction {
	readonly type: ActionTypes.SET_VALUE_ASYNC;
	readonly payload: { propertyId: string, index: number, value: string };
}
const setValueAsync = (propertyId: string, index: number, value: string): Action => ({
	type: ActionTypes.SET_VALUE_ASYNC,
	payload: { propertyId, index, value },
});


export { Action,  ActionTypes };
export { setValue };
export { setValueAsync };
