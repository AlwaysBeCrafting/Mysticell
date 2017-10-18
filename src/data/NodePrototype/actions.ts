import { TypedAction } from "data/common";

const enum ActionTypes {
  CHANGE_PROPERTY_INPUT_VALUE = "[Property] Change input value",
  MOVE_NODE_RELATIVE = "[Graph] Move node (relative)",

  CHANGE_PROPERTY_INPUT_VALUE_ASYNC = "[Property/Async] Change input value",
}
type Action =
  | SetPropertyInputValueAction
  | MoveNodeRelativeAction
  //
  | SetPropertyInputValueAsyncAction;

interface SetPropertyInputValueAction
  extends TypedAction<ActionTypes.CHANGE_PROPERTY_INPUT_VALUE> {
  payload: { propertyId: string; index: number; value: string };
}
const setPropertyInputValue = (
  propertyId: string,
  index: number,
  value: string,
): Action => ({
  type: ActionTypes.CHANGE_PROPERTY_INPUT_VALUE,
  payload: { propertyId, index, value },
});
interface MoveNodeRelativeAction
  extends TypedAction<ActionTypes.MOVE_NODE_RELATIVE> {
  payload: { prototypeId: string; nodeId: string; dX: number; dY: number };
}
const moveNodeRelative = (
  prototypeId: string,
  nodeId: string,
  dX: number,
  dY: number,
): Action => ({
  type: ActionTypes.MOVE_NODE_RELATIVE,
  payload: { prototypeId, nodeId, dX, dY },
});

interface SetPropertyInputValueAsyncAction
  extends TypedAction<ActionTypes.CHANGE_PROPERTY_INPUT_VALUE_ASYNC> {
  payload: { propertyId: string; index: number; value: string };
}
const changePropertyInputValueAsync = (
  propertyId: string,
  index: number,
  value: string,
): Action => ({
  type: ActionTypes.CHANGE_PROPERTY_INPUT_VALUE_ASYNC,
  payload: { propertyId, index, value },
});

export { Action, ActionTypes };
export {
  MoveNodeRelativeAction,
  SetPropertyInputValueAction,
  SetPropertyInputValueAsyncAction,
};
export { setPropertyInputValue, moveNodeRelative };
export { changePropertyInputValueAsync };
