import { combineReducers } from 'redux';

import document, { Document } from './Document';
import DocumentAction from './Document/actions';

import ui from './UI';
import UiAction from './UI/actions';
import UiState from './UI/model';


export interface AppState {
	document: Document;
	UI: UiState;
}


export type Action =
	DocumentAction |
	UiAction;


export default combineReducers<AppState>({
	document,
	ui,
});
