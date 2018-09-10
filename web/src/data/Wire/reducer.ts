import { EntityTable } from "data/common";

import { Action, ActionTypes } from "./actions";
import { Wire } from "./model";

const reducer = (
  state: EntityTable<Wire> = new EntityTable(),
  action: Action,
): EntityTable<Wire> => {
  switch (action.type) {
    case ActionTypes.CREATE: {
      const { wire } = action.payload;
      return state.putEntity(wire);
    }
    default:
      return state;
  }
};

export { reducer };
