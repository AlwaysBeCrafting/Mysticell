export class ActionTypes {
	static readonly SET_PATH = "[Path] Set";
}

export class SetPathAction {
	type = ActionTypes.SET_PATH;
	payload: { path: string[] };
}
export const setPath = ( path: string[] ) => ({
	type: ActionTypes.SET_PATH,
	payload: { path },
});

export type Actions = SetPathAction;
