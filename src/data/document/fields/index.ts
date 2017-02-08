import { combineReducers } from "redux";

import { Field } from "common/types";

import collection, { Action as CollectionAction } from "./collection";


export interface FieldState {
	collection: Map<number, Field>;
}


export type Action = CollectionAction;


export default combineReducers<FieldState>({
	collection,
});
