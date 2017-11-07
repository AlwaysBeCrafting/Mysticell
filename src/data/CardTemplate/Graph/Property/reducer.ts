import { Map } from "immutable";

import { CardTemplate, GraphCardTemplate } from "data/CardTemplate";

import { Action, ActionTypes } from "./actions";
import { isProperty } from "./model";

function reducer(state: Map<string, CardTemplate> = Map(), action: Action) {
  if (!isProperty(state.get(action.payload.propertyId))) {
    return state;
  }
  switch (action.type) {
    case ActionTypes.SET_INPUT_VALUE: {
      const { propertyId, node, value } = action.payload;
      return state.update(propertyId, (property: GraphCardTemplate) => {
        const n = property.graph.nodes.get(node)!;
        return property.setIn(["inputValues", n.index], value);
      });
    }
    default: {
      return state;
    }
  }
}

export { reducer };
