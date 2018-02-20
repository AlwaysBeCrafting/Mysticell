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
  readonly payload: { propertyId: string; index: number; value: string };
}
const setInputValue = (
  propertyId: string,
  index: number,
  value: string,
): Action => ({
  type: ActionTypes.SET_INPUT_VALUE,
  payload: { propertyId, index, value },
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
  readonly payload: { propertyId: string; index: number; value: string };
}
const setInputValueAsync = (
  propertyId: string,
  index: number,
  value: string,
): Action => ({
  type: ActionTypes.SET_INPUT_VALUE_ASYNC,
  payload: { propertyId, index, value },
});

export { Action, ActionTypes };
export { setInputValue, setOutputValues, setInputValueAsync };
