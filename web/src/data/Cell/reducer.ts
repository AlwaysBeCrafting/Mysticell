import { EntityTable } from "data/common";

import { Action, ActionTypes } from "./actions";
import { Cell } from "./model";

const reducer = (state = new EntityTable<Cell>(), action: Action) => {
  switch (action.type) {
    case ActionTypes.CREATE: {
      const { cell } = action.payload;
      return state.putEntity(cell);
    }
    default:
      return state;
  }
};

export { reducer };
