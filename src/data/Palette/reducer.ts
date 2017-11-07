import { List, ValueObject } from "immutable";
import { combineReducers } from "redux-immutable";

import { Tree } from "common/types";

import { reducer as templates } from "data/CardTemplate";
import { TemplatePath, TemplateTree } from "data/Palette";

import { Action, ActionTypes } from "./actions";
import { PaletteGroup } from "./model";

function documentTree(
  state: TemplateTree = Tree(),
  action: Action,
): TemplateTree {
  switch (action.type) {
    case ActionTypes.EXPAND_ITEM: {
      const path = pathToList(action.payload.path);
      return state.updateIn(path, item => new PaletteGroup(item.name, true));
    }
    case ActionTypes.COLLAPSE_ITEM: {
      const path = pathToList(action.payload.path);
      return state.updateIn(path, item => new PaletteGroup(item.name, false));
    }
    case ActionTypes.TOGGLE_ITEM: {
      const path = pathToList(action.payload.path);
      return state.updateIn(
        path,
        item => new PaletteGroup(item.name, !item.expanded),
      );
    }
    default: {
      return state;
    }
  }
}

function pathToList(path: TemplatePath) {
  return (List(path) as List<ValueObject | string>)
    .interpose("children")
    .unshift("children");
}

const reducer = combineReducers({
  documentTree,
  primitiveTree: tree => tree || Tree(),
  templates,
});

export { reducer };
