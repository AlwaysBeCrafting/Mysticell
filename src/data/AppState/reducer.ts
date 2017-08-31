import { combineReducers } from "redux";

import { reducer as document } from "data/Document";

import { AppState } from "./model";


const reducer = combineReducers<AppState>({
	document,
});


export { reducer };
