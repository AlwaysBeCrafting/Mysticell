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
    case ActionTypes.MOVE_NODE_RELATIVE: {
      const { prototypeId, nodeId, dX, dY } = action.payload;
      const newPrototype = { ...state[prototypeId] };
      if (!isGraph(newPrototype)) {
        throw new Error(`Cannot change layout on non-graph ${prototypeId}`);
      }
      const newLayout = {
        ...newPrototype.layout,
        [nodeId]: [
          newPrototype.layout[nodeId][0] + dX,
          newPrototype.layout[nodeId][1] + dY,
        ] as [number, number],
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
