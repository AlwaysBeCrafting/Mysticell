import * as path from "redux/actions/path";

const initialState: string[] = [];

export const reducer = (
	state = initialState,
	action: path.Actions,
): string[] => state;
