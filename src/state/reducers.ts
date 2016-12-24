import AppState from 'state';
import Action from 'state/actions';

import { reducer as reduceCollapseField } from 'state/actions/collapseField';
import { reducer as reduceExpandField } from 'state/actions/expandField';

import { reducer as reduceAddNode } from 'state/actions/addNode';

import { reducer as reduceSetPath } from 'state/actions/setPath';
import { reducer as reduceSetTitle } from 'state/actions/setTitle';

import { reducer as reduceMoveNode } from 'state/actions/moveNode';

//==============================================================================

const defaultState = {
	title: 'Document Title',
	path: [],

	fields: new Map(),
	formulas: new Map(),
	nodes: new Map(),

	sheets: new Map(),
	cards: new Map(),
	cells: new Map(),
};

const reducers = [
	reduceCollapseField,
	reduceExpandField,
	reduceAddNode,
	reduceSetPath,
	reduceSetTitle,
	reduceMoveNode,
];

export default ( state: AppState = defaultState, action: Action ): AppState => reducers.reduce(
	( localState, reducer ) => reducer( localState, action ),
	state,
);
