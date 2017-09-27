const enum ActionTypes {
	COLLAPSE_ALL_NAV_ITEMS = "[Nav View] Collapse all",
	EXPAND_NAV_ITEM        = "[Nav View] Expand item",
	TOGGLE_NAV_ITEM        = "[Nav View] Toggle Item",
}
type Action =
	| CollapseAllNavItemsAction
	| ExpandNavItemAction
	| ToggleNavItemAction;

interface CollapseAllNavItemsAction {
	readonly type: ActionTypes.COLLAPSE_ALL_NAV_ITEMS;
}
const collapseAllNavItems = (): CollapseAllNavItemsAction => ({
	type: ActionTypes.COLLAPSE_ALL_NAV_ITEMS,
});

interface ExpandNavItemAction {
	readonly type: ActionTypes.EXPAND_NAV_ITEM;
	payload: { path: string };
}
const expandNavItem = (path: string): ExpandNavItemAction => ({
	type: ActionTypes.EXPAND_NAV_ITEM,
	payload: { path },
});

interface ToggleNavItemAction {
	readonly type: ActionTypes.TOGGLE_NAV_ITEM;
	payload: { path: string };
}
const toggleNavItem = (path: string): ToggleNavItemAction => ({
	type: ActionTypes.TOGGLE_NAV_ITEM,
	payload: { path },
});


export { Action, ActionTypes };
export { collapseAllNavItems, expandNavItem, toggleNavItem };
