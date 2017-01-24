import * as path from "redux/actions/path";

const initialState: string[] = [];

export const reducer = (
	state = initialState,
	action: path.Actions,
): string[] => {
	switch ( action.type ) {
		case path.ActionTypes.SET_PATH:
			return action.payload.path;
		default: return state;
	}
};
