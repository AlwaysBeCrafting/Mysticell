export class ActionTypes {
	static readonly EXPAND_FIELD = "[Field] Expand";
	static readonly COLLAPSE_FIELD = "[Field] Collapse";
}


export class ExpandFieldAction {
	readonly type = ActionTypes.EXPAND_FIELD;
	constructor ( public payload: { fieldId: number }) {};
}
export const expandField = ( fieldId: number ): ExpandFieldAction => ({
	...new ExpandFieldAction({ fieldId }),
});


export class CollapseFieldAction {
	readonly type = ActionTypes.COLLAPSE_FIELD;
	constructor ( public payload: { fieldId: number }) {}
}
export const collapseField = ( fieldId: number ): CollapseFieldAction => ({
	...new CollapseFieldAction({ fieldId }),
});

export type Actions = ExpandFieldAction | CollapseFieldAction;
