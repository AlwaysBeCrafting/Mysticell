import { combineReducers } from "redux";

import { Action } from "redux/actions";

import { reducer as reduceDocument } from "redux/reducers/document";

import { reducer as reducePath              } from "redux/reducers/path";
import { PopupState, reducer as reducePopup } from "redux/reducers/popup";

import { DocumentState } from "./document";

export interface AppState {
	path: string[];
	popup: PopupState;
	document: DocumentState;
};

export const reducer = combineReducers<AppState>({
	document:      reduceDocument,

	path:          reducePath,
	popup:         reducePopup,
});
