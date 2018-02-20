import { Map } from "immutable";

import { composeReducers } from "common/utils";

import { Action, ActionTypes } from "./actions";
import { reducer as graphReducer } from "./Graph";
import { CardTemplate } from "./model";

const commonReducer = (
  state: Map<string, CardTemplate> = Map(),
  action: Action,
) => {
  switch (action.type) {
    case ActionTypes.SET_NAME: {
      const { templateId, name } = action.payload;
      return state.setIn([templateId, "name"], name);
    }
    default:
      return state;
  }
};

const reducer = composeReducers(commonReducer, graphReducer);

export { reducer };
