import { EntityTable } from "data/common";

import { Action, ActionTypes } from "./actions";
import { Source } from "./model";

const reducer = (
  state: EntityTable<Source> = new EntityTable(),
  action: Action,
): EntityTable<Source> => {
  switch (action.type) {
    case ActionTypes.CREATE: {
      const { source } = action.payload;
      return state.putEntity(source);
    }
    default:
      return state;
  }
};

export { reducer };
