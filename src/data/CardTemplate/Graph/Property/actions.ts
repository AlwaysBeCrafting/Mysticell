import { Param, TypedAction } from "data/common";
import { List } from "immutable";

const enum ActionTypes {
  SET_INPUT_VALUE = "[Template.Property] Set input value",
  SET_OUTPUT_VALUES = "[Template.Property] Set output values",
  //
  SET_INPUT_VALUE_ASYNC = "[Template.Property/Async] Set input value",
}
type Action =
  | SetInputValueAction
  | SetOutputValuesAction
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

interface SetOutputValuesAction
  extends TypedAction<ActionTypes.SET_OUTPUT_VALUES> {
  readonly payload: { propertyId: string; values: List<Param> };
}
const setOutputValues = (propertyId: string, values: List<Param>): Action => ({
  type: ActionTypes.SET_OUTPUT_VALUES,
  payload: { propertyId, values },
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
export { setInputValue, setOutputValues, setInputValueAsync };
