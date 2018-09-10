import { EntityTable } from "data/common";

import { Action, ActionTypes } from "./actions";
import { Sheet } from "./model";

const reducer = (
  state: EntityTable<Sheet> = new EntityTable(),
  action: Action,
) => {
  switch (action.type) {
    case ActionTypes.CREATE: {
      const { sheet } = action.payload;
      return state.putEntity(sheet);
    }
    default:
      return state;
  }
};

export { reducer };
