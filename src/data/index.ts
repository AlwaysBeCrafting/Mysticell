import { combineReducers } from "redux";

import document, { Action as DocumentAction } from "./document";
import path,     { Action as PathAction                    } from "./path";
import popup,    { Action as PopupAction,    PopupState    } from "./popup";


export interface AppState {
	path: string[];
	popup: PopupState;
};


export type Action =
	DocumentAction |
	PathAction     |
	PopupAction;


export default combineReducers<AppState>({
	document,

	path,
	popup,
});
