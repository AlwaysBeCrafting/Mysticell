import { Map } from "immutable";

import { Action, ActionTypes } from "./actions";
import { Card } from "./model";

const reducer = (state: Map<string, Card> = Map(), action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_LABEL: {
      const { cardId, label } = action.payload;
      return state.setIn([cardId, "label"], label);
    }
    case ActionTypes.SET_POSITION: {
      const { cardId, position } = action.payload;
      return state.setIn([cardId, "position"], position);
    }
    default: {
      return state;
    }
  }
};

export { reducer };
