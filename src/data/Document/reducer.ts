import { combineReducers } from "redux";

import { composeReducers } from "common/utils";

import { Action, ActionTypes } from "./actions";
import { Document } from "./model";


const defaultState: Document = {
	id: "DOCUMENT-0000",
	title: "Untitled",
	version: 0,
	include: [],

	sheets: {},
	nodePrototypes: {},

	nav: { value: "root" },
};

const documentReducer = (state: Document = defaultState, action: Action): Document => {
	switch (action.type) {
		case ActionTypes.LOAD_DOCUMENT: {
			return {...defaultState, ...action.payload.documentJson};
		}

		default: return state;
	}
};
const identity = <T>(x: T = {} as any) => x;
const subReducers = combineReducers<Document>({
	id: identity,
	title: identity,
	version: identity,
	include: identity,

	sheets: identity,
	nodePrototypes: identity,

	nav: identity,
});
const reducer = composeReducers(documentReducer, subReducers);


export { reducer };
