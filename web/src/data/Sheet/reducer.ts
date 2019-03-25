import { EntityTable } from "data/common";

import { Action, ActionTypes } from "./actions";
import { Sheet } from "./model";

const reducer = (state = new EntityTable<Sheet>(), action: Action) => {
  switch (action.type) {
    case ActionTypes.LOAD: {
      const { sheet } = action.payload;
      return state.putEntity(sheet);
    }
    default:
      return state;
  }
};

export { reducer };
