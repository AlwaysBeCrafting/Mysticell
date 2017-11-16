import { Map } from "immutable";

import { CardTemplate, GraphCardTemplate } from "data/CardTemplate";

import { Action, ActionTypes } from "./actions";

function reducer(state: Map<string, CardTemplate> = Map(), action: Action) {
  switch (action.type) {
    case ActionTypes.SET_INPUT_VALUE: {
      const { propertyId, index, value } = action.payload;
      return state.update(propertyId, (property: GraphCardTemplate) => {
        return property.setIn(["inputValues", index], value);
      });
    }
    case ActionTypes.SET_OUTPUT_VALUES: {
      const { propertyId, values } = action.payload;
      return state.setIn([propertyId, "outputValues"], values);
    }
    default: {
      return state;
    }
  }
}

export { reducer };
