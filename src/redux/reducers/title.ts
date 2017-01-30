import * as title from "redux/actions/title";

const defaultState = "Untitled Document";

export const reducer = (
	state = defaultState,
	action: title.Actions,
): string => state;
