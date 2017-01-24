export class ActionTypes {
	static readonly SET_PATH = "[Path] Set";
}

export class SetPathAction {
	readonly type = ActionTypes.SET_PATH;
	constructor ( public payload: { path: string[] }) {};
}
export const setPath = ( path: string[] ) => ({
	...new SetPathAction({ path }),
});

export type Actions = SetPathAction;
