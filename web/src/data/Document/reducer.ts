import { Map } from "immutable";

import { EntityTable } from "data/common";

import { Action, ActionTypes } from "./actions";
import { Document } from "./model";

const reducer = (
  state: EntityTable<Document> = Map(),
  action: Action,
): EntityTable<Document> => {
  switch (action.type) {
    case ActionTypes.CREATE: {
      const { document } = action.payload;
      return state.set(document.id, document);
    }
    default:
      return state;
  }
};

export { reducer };
