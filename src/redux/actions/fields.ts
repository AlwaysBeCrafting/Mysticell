export class ActionTypes {
	static readonly EXPAND_FIELD   = "[Fields] Expand";
	static readonly COLLAPSE_FIELD = "[Fields] Collapse";
}


export class ExpandFieldAction {
	type = ActionTypes.EXPAND_FIELD;
	payload: { fieldId: number };
}
export const expandField = ( fieldId: number ): ExpandFieldAction => ({
	type: ActionTypes.EXPAND_FIELD,
	payload: { fieldId },
});


export class CollapseFieldAction {
	type = ActionTypes.COLLAPSE_FIELD;
	constructor ( public payload: { fieldId: number }) {}
}
export const collapseField = ( fieldId: number ): CollapseFieldAction => ({
	type: ActionTypes.COLLAPSE_FIELD,
	payload: { fieldId },
});


export type Actions = ExpandFieldAction | CollapseFieldAction;
