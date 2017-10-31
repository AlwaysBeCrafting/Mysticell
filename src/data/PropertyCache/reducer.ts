import { Map } from "immutable";

import { Action, ActionTypes } from "./actions";
import { PropertyCache } from "./model";

const reducer = (
  state: PropertyCache = Map(),
  action: Action,
): PropertyCache => {
  switch (action.type) {
    case ActionTypes.SET_PARAMS: {
      const { propertyId, params } = action.payload;
      return state.set(propertyId, params);
    }
    default:
      return state;
  }
};

export { reducer };
