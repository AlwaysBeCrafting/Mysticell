import AppState from 'state';
import Action from 'state/actions';

import { reducer as reduceAddNode } from 'state/actions/addNode';
import { reducer as reduceCollapseField } from 'state/actions/collapseField';
import { reducer as reduceConnectNodes } from 'state/actions/connectNodes';
import { reducer as reduceDisconnectNodes } from 'state/actions/disconnectNodes';
import { reducer as reduceExpandField } from 'state/actions/expandField';
import { reducer as reduceLoadDocument } from 'state/actions/loadDocument';
import { reducer as reduceMoveNode } from 'state/actions/moveNode';
import { reducer as reduceSetPath } from 'state/actions/setPath';
import { reducer as reduceSetPathToFormula } from 'state/actions/setPathToFormula';
import { reducer as reduceSetTitle } from 'state/actions/setTitle';

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
	reduceAddNode,
	reduceCollapseField,
	reduceConnectNodes,
	reduceDisconnectNodes,
	reduceExpandField,
	reduceLoadDocument,
	reduceMoveNode,
	reduceSetPath,
	reduceSetPathToFormula,
	reduceSetTitle,
];

export default ( state: AppState = defaultState, action: Action ): AppState => reducers.reduce(
	( localState, reducer ) => reducer( localState, action ),
	state,
);
