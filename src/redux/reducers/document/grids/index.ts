import { combineReducers } from "redux";

import { Grid } from "data";

import { reducer as reduceGrids } from "./grids";

export interface GridState {
	grids: Map<number, Grid>;
}

export const reducer = combineReducers<GridState>({
	grids: reduceGrids,
});
