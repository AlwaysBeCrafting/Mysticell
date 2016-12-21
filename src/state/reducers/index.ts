import { combineReducers, Reducer } from 'redux';

import Doc, { docFromJSON, DocUI, NodeMap } from 'data/doc';
import DocJSON from 'data/docJson';

import Action from 'state/action';

import reduceDoc  from 'state/reducers/doc';
import reducePath from 'state/reducers/path';
import reduceUi   from 'state/reducers/ui';

export interface AppState {
	doc: Doc;
	path: string[];
	ui: DocUI;
}

//==============================================================================

export default combineReducers<AppState>({
	doc:  reduceDoc,
	path: reducePath,
	ui:   reduceUi,
});
