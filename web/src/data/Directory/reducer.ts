import { EntityTable } from "data/common";

import { Action, ActionTypes } from "./actions";
import { Directory } from "./model";

const reducer = (
  state: EntityTable<Directory> = new EntityTable(),
  action: Action,
): EntityTable<Directory> => {
  switch (action.type) {
    case ActionTypes.CREATE: {
      const { directory } = action.payload;
      return state.putEntity(directory);
    }
    default:
      return state;
  }
};

export { reducer };
