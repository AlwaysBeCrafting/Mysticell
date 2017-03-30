import { combineReducers } from "redux";

import collection, { Action as CollectionAction } from "./collection";


export interface SheetState {
}


export type Action = CollectionAction;


export default combineReducers<SheetState>({
	collection,
});
