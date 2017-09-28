import {TypedAction} from "data/common";


const enum ActionTypes {
	COLLAPSE_ALL_NAV_ITEMS = "[Nav View] Collapse all",
	EXPAND_NAV_ITEM        = "[Nav View] Expand item",
	TOGGLE_NAV_ITEM        = "[Nav View] Toggle Item",
}
type Action =
	| CollapseAllNavItemsAction
	| ExpandNavItemAction
	| ToggleNavItemAction;

interface CollapseAllNavItemsAction extends TypedAction<ActionTypes.COLLAPSE_ALL_NAV_ITEMS> {}
const collapseAllNavItems = (): Action => ({
	type: ActionTypes.COLLAPSE_ALL_NAV_ITEMS,
});

interface ExpandNavItemAction extends TypedAction<ActionTypes.EXPAND_NAV_ITEM> {
	payload: { path: string };
}
const expandNavItem = (path: string): Action => ({
	type: ActionTypes.EXPAND_NAV_ITEM,
	payload: { path },
});

interface ToggleNavItemAction extends TypedAction<ActionTypes.TOGGLE_NAV_ITEM> {
	payload: { path: string };
}
const toggleNavItem = (path: string): Action => ({
	type: ActionTypes.TOGGLE_NAV_ITEM,
	payload: { path },
});


export { Action, ActionTypes };
export { collapseAllNavItems, expandNavItem, toggleNavItem };
