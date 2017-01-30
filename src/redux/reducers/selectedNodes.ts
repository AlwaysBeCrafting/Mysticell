import * as selectedNodes from "redux/actions/selectedNodes";

const defaultState: number[] = [];

export const reducer = (
	state = defaultState,
	action: selectedNodes.Actions,
): number[] => state;
