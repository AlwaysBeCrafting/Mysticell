import { List, Map } from "immutable";

import { Position2d } from "common/types";

import { Edge, PinIndex } from "data/Graph";

import { Action, ActionTypes } from "./actions";
import { NodePrototype } from "./model";

const reducer = (state: Map<string, NodePrototype> = Map(), action: Action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_PROPERTY_INPUT_VALUE: {
      const { propertyId, index, value } = action.payload;
      return state.setIn([propertyId, "inputValues", index], value);
    }
    case ActionTypes.ADD_NODE: {
      const { prototypeId, node } = action.payload;
      return state.withMutations(newState =>
        newState
          .setIn([prototypeId, "graph", node.id], node)
          .setIn([prototypeId, "layout", node.id], new Position2d()),
      );
    }
    case ActionTypes.REMOVE_NODE: {
      const { prototypeId, nodeId } = action.payload;
      return state.withMutations(newState =>
        newState
          .removeIn([prototypeId, "graph", nodeId])
          .removeIn([prototypeId, "layout", nodeId]),
      );
    }
    case ActionTypes.PLACE_NODE: {
      const { prototypeId, nodeId, newPosition } = action.payload;
      return state.setIn([prototypeId, "layout", nodeId], newPosition);
    }
    case ActionTypes.CONNECT_NODES: {
      const { prototypeId, fromId, fromIndex, toId, toIndex } = action.payload;
      return state.updateIn(
        [prototypeId, "graph", fromId, "edges"],
        (edges: List<Edge>) =>
          edges.push(
            new Edge({
              target: toId,
              index: new PinIndex({ src: fromIndex, dst: toIndex }),
            }),
          ),
      );
    }
    default:
      return state;
  }
};

export { reducer };
