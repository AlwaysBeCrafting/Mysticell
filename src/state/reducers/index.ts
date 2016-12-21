import { combineReducers } from 'redux';

import AppState from 'state';

import reduceDoc  from 'state/reducers/doc';
import reducePath from 'state/reducers/path';
import reduceUi   from 'state/reducers/ui';

//==============================================================================

export default combineReducers<AppState>({
	doc:  reduceDoc,
	path: reducePath,
	ui:   reduceUi,
});
