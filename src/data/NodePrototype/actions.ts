import { Position2d } from "common/types";

import { TypedAction } from "data/common";
import { InnerNode } from "data/Graph";

const enum ActionTypes {
  CHANGE_PROPERTY_INPUT_VALUE = "[Property] Change input value",
  ADD_NODE = "[Graph] Add node",
  REMOVE_NODE = "[Graph] Remove node",
  PLACE_NODE = "[Graph] Place node",
  CONNECT_NODES = "[Graph] Connect nodes",

  CHANGE_PROPERTY_INPUT_VALUE_ASYNC = "[Property/Async] Change input value",
}
type Action =
  | SetPropertyInputValueAction
  | AddNodeAction
  | RemoveNodeAction
  | PlaceNodeAction
  | ConnectNodesAction
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
const addNode = (prototypeId: string, node: InnerNode): Action => ({
  type: ActionTypes.ADD_NODE,
  payload: { prototypeId, node },
});

interface RemoveNodeAction extends TypedAction<ActionTypes.REMOVE_NODE> {
  payload: { prototypeId: string; nodeId: string };
}
const removeNode = (prototypeId: string, nodeId: string): Action => ({
  type: ActionTypes.REMOVE_NODE,
  payload: { prototypeId, nodeId },
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

interface ConnectNodesAction extends TypedAction<ActionTypes.CONNECT_NODES> {
  payload: {
    prototypeId: string;
    fromId: string;
    fromIndex: number;
    toId: string;
    toIndex: number;
  };
}
const connectNodes = (
  prototypeId: string,
  fromId: string,
  fromIndex: number,
  toId: string,
  toIndex: number,
): Action => ({
  type: ActionTypes.CONNECT_NODES,
  payload: { prototypeId, fromId, fromIndex, toId, toIndex },
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
export { setPropertyInputValue, addNode, removeNode, placeNode, connectNodes };
export { changePropertyInputValueAsync };
