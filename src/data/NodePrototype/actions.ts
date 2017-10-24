import { Position2d } from "common/types";

import { TypedAction } from "data/common";
import { InnerNode } from "data/Graph";

const enum ActionTypes {
  CHANGE_PROPERTY_INPUT_VALUE = "[Property] Change input value",
  PLACE_NODE = "[Graph] Place node",
  ADD_NODE = "[Graph] Add node",

  CHANGE_PROPERTY_INPUT_VALUE_ASYNC = "[Property/Async] Change input value",
}
type Action =
  | SetPropertyInputValueAction
  | PlaceNodeAction
  | AddNodeAction
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

interface AddNodeAction extends TypedAction<ActionTypes.ADD_NODE> {
  payload: { prototypeId: string; node: InnerNode };
}
const addNode = (prototypeId: string, node: InnerNode) => ({
  type: ActionTypes.ADD_NODE,
  payload: { prototypeId, node },
});

interface PlaceNodeAction extends TypedAction<ActionTypes.PLACE_NODE> {
  payload: { prototypeId: string; nodeId: string; newPosition: Position2d };
}
const placeNode = (
  prototypeId: string,
  nodeId: string,
  newPosition: Position2d,
): Action => ({
  type: ActionTypes.PLACE_NODE,
  payload: { prototypeId, nodeId, newPosition },
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
  PlaceNodeAction,
  SetPropertyInputValueAction,
  SetPropertyInputValueAsyncAction,
};
export { setPropertyInputValue, placeNode, addNode };
export { changePropertyInputValueAsync };
