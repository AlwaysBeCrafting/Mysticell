export namespace ActionTypes {
	export const EXPAND_TREE_ITEM   = '[Tree Item] Expand';
	export const COLLAPSE_TREE_ITEM = '[Tree Item] Collapse';
}


interface ExpandTreeItemAction {
	readonly type: typeof ActionTypes.EXPAND_TREE_ITEM;
	payload: { id: string };
}

const expandTreeItem = ( id: string ): ExpandTreeItemAction => ({
	type: ActionTypes.EXPAND_TREE_ITEM,
	payload: { id },
});


interface CollapseTreeItemAction {
	readonly type: typeof ActionTypes.COLLAPSE_TREE_ITEM;
	payload: { id: string };
}

const collapseTreeItem = ( id: string ): CollapseTreeItemAction => ({
	type: ActionTypes.COLLAPSE_TREE_ITEM,
	payload: { id },
});


type Action = ExpandTreeItemAction | CollapseTreeItemAction;


export { expandTreeItem, collapseTreeItem };
export default Action;
