import { Map } from "immutable";

import { EntityTable } from "data/common";

import { Action, ActionTypes } from "./actions";
import { Wire } from "./model";

const reducer = (
  state: EntityTable<Wire> = Map(),
  action: Action,
): EntityTable<Wire> => {
  switch (action.type) {
    case ActionTypes.CREATE: {
      const { wire } = action.payload;
      return state.set(wire.id, wire);
    }
    default:
      return state;
  }
};

export { reducer };
