namespace ActionTypes {
	export const EXPAND_ITEM   = '[Tree] Expand item';
	export const COLLAPSE_ITEM = '[Tree] Collapse item';
}
type Action =
	| ExpandItemAction
	| CollapseItemAction;


interface ExpandItemAction {
	readonly type: typeof ActionTypes.EXPAND_ITEM;
	payload: { id: string };
}
const expandItem = ( id: string ): ExpandItemAction => ({
	type: ActionTypes.EXPAND_ITEM,
	payload: { id },
});

interface CollapseItemAction {
	readonly type: typeof ActionTypes.COLLAPSE_ITEM;
	payload: { id: string };
}
const collapseItem = ( id: string ): CollapseItemAction => ({
	type: ActionTypes.COLLAPSE_ITEM,
	payload: { id },
});


export { Action, ActionTypes };
export { expandItem, collapseItem };
