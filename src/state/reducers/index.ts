import { combineReducers } from 'redux';

import AppState from 'state';

import reduceCards from 'state/reducers/cards';
import reduceCells from 'state/reducers/cells';
import reduceFields from 'state/reducers/fields';
import reduceFormulas from 'state/reducers/formulas';
import reduceNodes from 'state/reducers/nodes';
import reducePath from 'state/reducers/path';
import reduceSheets from 'state/reducers/sheets';
import reduceTitle from 'state/reducers/title';

//==============================================================================

export default combineReducers<AppState>({
	title: reduceTitle,

	sheets: reduceSheets,
	cards: reduceCards,
	cells: reduceCells,

	fields: reduceFields,
	formulas: reduceFormulas,
	nodes: reduceNodes,

	path: reducePath,
});
