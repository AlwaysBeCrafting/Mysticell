class ActionTypes {
	static readonly SET_TITLE = "[Title] Set";
}


class SetTitleAction {
	readonly type = ActionTypes.SET_TITLE;
	constructor ( public payload: { title: string }) {};
}
export const setTitle = ( title: string ): SetTitleAction => ({
	...new SetTitleAction({ title }),
});


export type Action = SetTitleAction;


export default ( state = "Untitled Document", action: Action ): string => state;
