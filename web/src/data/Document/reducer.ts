import { EntityTable } from "data/common";

import { Action, ActionTypes } from "./actions";
import { Document } from "./model";

const reducer = (
  state: EntityTable<Document> = new EntityTable(),
  action: Action,
): EntityTable<Document> => {
  switch (action.type) {
    case ActionTypes.LOAD: {
      const { document } = action.payload;
      return state.putEntity(document);
    }
    default:
      return state;
  }
};

export { reducer };
