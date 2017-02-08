import { combineReducers } from "redux";

import { Sheet } from "common/types";

import collection, { Action as CollectionAction } from "./collection";


export interface SheetState {
	collection: Map<number, Sheet>;
}


export type Action = CollectionAction;


export default combineReducers<SheetState>({
	collection,
});
