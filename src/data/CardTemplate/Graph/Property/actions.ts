import { TypedAction } from "data/common";

const enum ActionTypes {
  SET_INPUT_VALUE = "[Template.Property] Set input value",
  //
  SET_INPUT_VALUE_ASYNC = "[Template.Property/Async] Set input value",
}
type Action =
  | SetInputValueAction
  //
  | SetInputValueAsyncAction;

interface SetInputValueAction extends TypedAction<ActionTypes.SET_INPUT_VALUE> {
  readonly payload: { propertyId: string; node: string; value: string };
}
const setInputValue = (
  propertyId: string,
  node: string,
  value: string,
): Action => ({
  type: ActionTypes.SET_INPUT_VALUE,
  payload: { propertyId, node, value },
});

interface SetInputValueAsyncAction
  extends TypedAction<ActionTypes.SET_INPUT_VALUE_ASYNC> {
  readonly payload: { propertyId: string; node: string; value: string };
}
const setInputValueAsync = (
  propertyId: string,
  node: string,
  value: string,
): Action => ({
  type: ActionTypes.SET_INPUT_VALUE_ASYNC,
  payload: { propertyId, node, value },
});

export { Action, ActionTypes };
export { setInputValue, setInputValueAsync };
