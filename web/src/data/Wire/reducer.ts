import { EntityTable } from "~/data/common";

import { Action, ActionTypes } from "./actions";
import { Wire } from "./model";

const reducer = (state = new EntityTable<Wire>(), action: Action) => {
  switch (action.type) {
    case ActionTypes.INSERT: {
      const { wire } = action.payload;
      return state.putEntity(wire);
    }
    default:
      return state;
  }
};

export { reducer };
