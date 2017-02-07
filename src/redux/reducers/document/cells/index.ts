import { combineReducers } from "redux";

import { Cell } from "data";

import { reducer as reduceCells } from "./cells";

export interface CellState {
	cells: Map<number, Cell>;
}

export const reducer = combineReducers<CellState>({
	cells: reduceCells,
});
