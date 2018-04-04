import { Map } from "immutable";

import { EntityTable } from "data/common";

import { Action, ActionTypes } from "./actions";
import { Sheet } from "./model";

const reducer = (state: EntityTable<Sheet> = Map(), action: Action) => {
  switch (action.type) {
    case ActionTypes.CREATE: {
      const { sheet } = action.payload;
      return state.set(sheet.id, sheet);
    }
    default:
      return state;
  }
};

export { reducer };
