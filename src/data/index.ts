import { combineReducers } from "redux";

import { reducer as document } from "./Document";
import { Action as DocumentAction } from "./Document/actions";
import { Document } from "./Document/model";


interface AppState {
	document: Document;
}

type Action =
	DocumentAction;

const reducer = combineReducers<AppState>({
	document,
});

export { AppState, Action };
export { reducer };
