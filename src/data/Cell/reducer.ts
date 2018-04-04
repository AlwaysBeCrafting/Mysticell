import { Map } from "immutable";

import { Cell } from "data/Cell";
import { EntityTable } from "data/common";

import { Action, ActionTypes } from "./actions";

const reducer = (
  state: EntityTable<Cell> = Map(),
  action: Action,
): EntityTable<Cell> => {
  switch (action.type) {
    case ActionTypes.CREATE: {
      const { cell } = action.payload;
      return state.set(cell.id, cell);
    }
    default:
      return state;
  }
};

export { reducer };
