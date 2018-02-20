import { TypedAction } from "data/common";
import { TemplatePath } from "data/Palette";

const enum ActionTypes {
  EXPAND_ITEM = "[Palette] Expand item",
  COLLAPSE_ITEM = "[Palette] Collapse item",
  TOGGLE_ITEM = "[Palette] Toggle item",
}

type Action = ExpandItemAction | CollapseItemAction | ToggleItemAction;

interface ExpandItemAction extends TypedAction<ActionTypes.EXPAND_ITEM> {
  readonly payload: { path: TemplatePath };
}
const expandItem = (path: TemplatePath): Action => ({
  type: ActionTypes.EXPAND_ITEM,
  payload: { path },
});

interface CollapseItemAction extends TypedAction<ActionTypes.COLLAPSE_ITEM> {
  readonly payload: { path: TemplatePath };
}
const collapseItem = (path: TemplatePath): Action => ({
  type: ActionTypes.COLLAPSE_ITEM,
  payload: { path },
});

interface ToggleItemAction extends TypedAction<ActionTypes.TOGGLE_ITEM> {
  readonly payload: { path: TemplatePath };
}
const toggleItem = (path: TemplatePath): Action => ({
  type: ActionTypes.TOGGLE_ITEM,
  payload: { path },
});

export { Action, ActionTypes };
export { expandItem, collapseItem, toggleItem };
