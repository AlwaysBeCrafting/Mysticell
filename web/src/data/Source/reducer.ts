import { Map } from "immutable";

import { EntityTable } from "data/common";

import { Action, ActionTypes } from "./actions";
import { Source } from "./model";

const reducer = (
  state: EntityTable<Source> = Map(),
  action: Action,
): EntityTable<Source> => {
  switch (action.type) {
    case ActionTypes.CREATE: {
      const { source } = action.payload;
      return state.set(source.id, source);
    }
    default:
      return state;
  }
};

export { reducer };
