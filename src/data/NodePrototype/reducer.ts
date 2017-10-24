import { Dict } from "common/types";

import { Action, ActionTypes } from "./actions";
import { isGraph, isProperty, NodePrototype } from "./model";

const reducer = (state: Dict<NodePrototype> = {}, action: Action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_PROPERTY_INPUT_VALUE: {
      const { propertyId, index, value } = action.payload;
      const oldProperty = state[propertyId];
      if (!isProperty(oldProperty)) {
        throw new Error(
          `Cannot change input values on non-property ${propertyId}`,
        );
      }
      const newInputValues = [...oldProperty.inputValues];
      newInputValues[index] = value;
      const newProperty = {
        ...oldProperty,
        inputValues: newInputValues,
      };
      return {
        ...state,
        [propertyId]: newProperty,
      };
    }
    case ActionTypes.PLACE_NODE: {
      const { prototypeId, nodeId, newPosition } = action.payload;
      const newPrototype = { ...state[prototypeId] };
      if (!isGraph(newPrototype)) {
        throw new Error(`Cannot change layout on non-graph ${prototypeId}`);
      }
      const newLayout = {
        ...newPrototype.layout,
        [nodeId]: newPosition,
      };
      newPrototype.layout = newLayout;
      return {
        ...state,
        [prototypeId]: newPrototype,
      };
    }
    case ActionTypes.ADD_NODE: {
      const { prototypeId, node } = action.payload;
      const newPrototype = { ...state[prototypeId] };
      if (!isGraph(newPrototype)) {
        throw new Error(`Cannot add node to non-graph ${prototypeId}`);
      }
      const newGraph = {
        ...newPrototype.graph,
        [node.id]: node,
      };
      newPrototype.graph = newGraph;
      const newLayout = {
        ...newPrototype.layout,
        [node.id]: { x: 0, y: 0 },
      };
      newPrototype.layout = newLayout;
      return {
        ...state,
        [prototypeId]: newPrototype,
      };
    }
    default:
      return state;
  }
};

export { reducer };
