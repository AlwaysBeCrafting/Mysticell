export class ActionTypes {
	static readonly SELECT_NODES = "[SelectedNodes] Select";
}

export class SelectNodesAction {
	type = ActionTypes.SELECT_NODES;
	constructor ( public payload: { nodes: number[] }) {}
}
export const selectNodes = ( nodes: number[] ) => ({
	type: ActionTypes.SELECT_NODES,
	payload: { nodes },
});


export type Actions = SelectNodesAction;
