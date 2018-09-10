import { Cell } from "data/Cell";
import { EntityTable } from "data/common";

import { Action, ActionTypes } from "./actions";

const reducer = (
  state: EntityTable<Cell> = new EntityTable(),
  action: Action,
): EntityTable<Cell> => {
  switch (action.type) {
    case ActionTypes.CREATE: {
      const { cell } = action.payload;
      return state.putEntity(cell);
    }
    default:
      return state;
  }
};

export { reducer };
