import { combineReducers } from "redux";

import { Field } from "data";

import { reducer as reduceFields } from "./fields";

export interface FieldState {
	fields: Map<number, Field>;
}

export const reducer = combineReducers<FieldState>({
	fields: reduceFields,
});
