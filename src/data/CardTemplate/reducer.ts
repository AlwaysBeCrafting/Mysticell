import { Map } from "immutable";

import { Action, ActionTypes } from "./actions";
import { CardTemplate } from "./model";

const reducer = (state: Map<string, CardTemplate> = Map(), action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_NAME: {
      const { templateId, name } = action.payload;
      return state.setIn([templateId, "name"], name);
    }
    default:
      return state;
  }
};

export { reducer };
