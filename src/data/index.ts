import { combineReducers } from 'redux';

import { reducer as document } from './Document';
import { Action as DocumentAction } from './Document/actions';
import { Document } from './Document/model';

import { reducer as ui } from './UI';
import { Action as UiAction } from './UI/actions';
import { UiState } from './UI/model';


interface AppState {
	document: Document;
	ui: UiState;
}

type Action =
	DocumentAction |
	UiAction;

const reducer = combineReducers<AppState>({
	document,
	ui,
});

export { AppState, Action };
export { reducer };
