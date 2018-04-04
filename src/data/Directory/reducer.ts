import { Map } from "immutable";

import { EntityTable } from "data/common";

import { Action, ActionTypes } from "./actions";
import { Directory } from "./model";

const reducer = (
  state: EntityTable<Directory> = Map(),
  action: Action,
): EntityTable<Directory> => {
  switch (action.type) {
    case ActionTypes.CREATE: {
      const { directory } = action.payload;
      return state.set(directory.id, directory);
    }
    default:
      return state;
  }
};

export { reducer };
