import { EntityTable } from "~/data/common";

import { Action, ActionTypes } from "./actions";
import { Source } from "./model";

const reducer = (state = new EntityTable<Source>(), action: Action) => {
  switch (action.type) {
    case ActionTypes.INSERT: {
      const { source } = action.payload;
      return state.putEntity(source);
    }
    default:
      return state;
  }
};

export { reducer };
