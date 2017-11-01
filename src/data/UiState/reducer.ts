import { Set } from "immutable";

import { Action, ActionTypes } from "./actions";
import { UiState } from "./model";

const reducer = (state: UiState = new UiState(), action: Action): UiState => {
  switch (action.type) {
    case ActionTypes.COLLAPSE_ALL_NAV_ITEMS: {
      return state.set("expandedNavItems", Set());
    }
    case ActionTypes.EXPAND_NAV_ITEM: {
      return state.update("expandedNavItems", set =>
        set.add(action.payload.path),
      );
    }
    case ActionTypes.TOGGLE_NAV_ITEM: {
      const { path } = action.payload;
      return state.update(
        "expandedNavItems",
        set => (set.has(path) ? set.remove(path) : set.add(path)),
      );
    }
    default:
      return state;
  }
};

export { reducer };
