import * as cards from "redux/actions/cards";
import { CellState } from "redux/state";

const initialState: Map<number, CellState> = new Map();

export const reducer = (
	state = initialState,
	action: cards.Actions,
): Map<number, CellState> => state;
