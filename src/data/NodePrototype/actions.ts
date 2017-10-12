import { TypedAction } from "data/common";


const enum ActionTypes {
	CHANGE_PROPERTY_INPUT_VALUE = "[Property] Change input value",

	CHANGE_PROPERTY_INPUT_VALUE_ASYNC = "[Property/Async] Change input value",
}
type Action =
	| SetPropertyInputValueAction
	| SetPropertyInputValueAsyncAction;

interface SetPropertyInputValueAction extends TypedAction<ActionTypes.CHANGE_PROPERTY_INPUT_VALUE> {
	payload: { propertyId: string, index: number, value: string };
}
const setPropertyInputValue = (propertyId: string, index: number, value: string): Action => ({
	type: ActionTypes.CHANGE_PROPERTY_INPUT_VALUE,
	payload: { propertyId, index, value },
});

interface SetPropertyInputValueAsyncAction extends TypedAction<ActionTypes.CHANGE_PROPERTY_INPUT_VALUE_ASYNC> {
	payload: { propertyId: string, index: number, value: string };
}
const changePropertyInputValueAsync = (propertyId: string, index: number, value: string): Action => ({
	type: ActionTypes.CHANGE_PROPERTY_INPUT_VALUE_ASYNC,
	payload: { propertyId, index, value },
});


export { Action, ActionTypes };
export { setPropertyInputValue, changePropertyInputValueAsync };
