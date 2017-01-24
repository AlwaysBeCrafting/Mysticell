export class ActionTypes {
	static readonly SET_TITLE = "[Title] Set";
}

export class SetTitleAction {
	readonly type = ActionTypes.SET_TITLE;
	constructor ( public payload: { title: string }) {};
}
export const setTitle = ( title: string ): SetTitleAction => ({
	...new SetTitleAction({ title }),
});


export type Actions = SetTitleAction;
