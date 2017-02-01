import * as grids from "redux/actions/grids";
import { CellState } from "redux/state";

const initialState: Map<number, CellState> = new Map();

export const reducer = (
	state = initialState,
	action: grids.Actions,
): Map<number, CellState> => state;
