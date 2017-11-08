import { combineReducers } from "redux-immutable";

import { Tree } from "common/types";

import { reducer as templates } from "data/CardTemplate";

import { Action, ActionTypes } from "./actions";
import { PaletteGroup, TemplateTree } from "./model";

function documentTree(
  state: TemplateTree = Tree(),
  action: Action,
): TemplateTree {
  switch (action.type) {
    case ActionTypes.EXPAND_ITEM: {
      const { path } = action.payload;
      const item = state.getItem(path);
      return item && item.type === "group"
        ? state.setItem(path, new PaletteGroup(item.name, true))
        : state;
    }
    case ActionTypes.COLLAPSE_ITEM: {
      const { path } = action.payload;
      const item = state.getItem(path);
      return item && item.type === "group"
        ? state.setItem(path, new PaletteGroup(item.name, false))
        : state;
    }
    case ActionTypes.TOGGLE_ITEM: {
      const { path } = action.payload;
      const item = state.getItem(path);
      return item && item.type === "group"
        ? state.setItem(path, new PaletteGroup(item.name, !item.isExpanded))
        : state;
    }
    default: {
      return state;
    }
  }
}

const reducer = combineReducers({
  documentTree,
  primitiveTree: tree => tree || Tree(),
  templates,
});

export { reducer };
