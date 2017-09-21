import {combineReducers} from "redux";

import {reducer as document} from "data/Document";
import {reducer as uiState} from "data/UiState";

import {AppState} from "./model";


const reducer = combineReducers<AppState>({
	document,
	uiState,
});


export {reducer};
