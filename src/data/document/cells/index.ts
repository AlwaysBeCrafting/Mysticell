import { combineReducers } from "redux";

import { Cell } from "common/types";

import collection, { Action as CollectionAction } from "./collection";


export interface CellState {
	collection: Map<number, Cell>;
}


export type Action = CollectionAction;


export default combineReducers<CellState>({
	collection,
});
