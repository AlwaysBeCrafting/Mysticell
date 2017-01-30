export class ActionTypes {
	static readonly SELECT_NODES = "[SelectedNodes] Select";
}


export class SelectNodesAction {
	readonly type = ActionTypes.SELECT_NODES;
	constructor ( public payload: { nodes: number[] }) {}
}
export const selectNodes = ( nodes: number[] ) => ({
	...new SelectNodesAction({ nodes }),
});


export type Actions = SelectNodesAction;
