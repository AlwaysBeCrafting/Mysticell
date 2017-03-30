class ActionTypes {
	static readonly SELECT_NODES = "[Nodes] Select";
}


class SelectNodesAction {
	readonly type = ActionTypes.SELECT_NODES;
	constructor ( public payload: { nodes: number[] }) {}
}

export const selectNodes = ( nodes: number[] ) => ({
	...new SelectNodesAction({ nodes }),
});


export type Action = SelectNodesAction;


export default ( state = [], action: Action ): number[] => state;
