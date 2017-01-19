export class ActionTypes {
	static readonly SET_TITLE = "[Title] Set";
}

export class SetTitleAction {
	type = ActionTypes.SET_TITLE;
	payload: { title: string };
}
export const setTitle = ( title: string ): SetTitleAction => ({
	type: ActionTypes.SET_TITLE,
	payload: { title },
});

export type Actions = SetTitleAction;
