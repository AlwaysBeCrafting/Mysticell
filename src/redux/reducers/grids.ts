import * as grids from "redux/actions/grids";
import { GridState } from "redux/state";

const initialState: Map<number, GridState> = new Map();

export const reducer = (
	state = initialState,
	action: grids.Actions,
): Map<number, GridState> => state;
