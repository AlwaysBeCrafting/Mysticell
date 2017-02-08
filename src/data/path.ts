class ActionTypes {
	static readonly SET_PATH = "[Path] Set";
}


class SetPathAction {
	readonly type = ActionTypes.SET_PATH;
	constructor ( public payload: { path: string[] }) {};
}
export const setPath = ( path: string[] ) => ({
	...new SetPathAction({ path }),
});


export type Action = SetPathAction;


export default ( state = [], action: Action ): string[] => {
	switch ( action.type ) {

		case ActionTypes.SET_PATH:
			return action.payload.path;

		default: return state;
	}
};
