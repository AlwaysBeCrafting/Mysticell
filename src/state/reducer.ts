import AppState from 'state';
import Action from 'state/action';

import { reducer as reduceAddNode } from 'state/action/addNode';
import { reducer as reduceCollapseField } from 'state/action/collapseField';
import { reducer as reduceConnectNodes } from 'state/action/connectNodes';
import { reducer as reduceDisconnectNodes } from 'state/action/disconnectNodes';
import { reducer as reduceExpandField } from 'state/action/expandField';
import { reducer as reduceLoadDocument } from 'state/action/loadDocument';
import { reducer as reduceMoveNode } from 'state/action/moveNode';
import { reducer as reduceRemoveNode } from 'state/action/removeNode';
import { reducer as reduceSelectNode } from 'state/action/selectNode';
import { reducer as reduceSetPath } from 'state/action/setPath';
import { reducer as reduceSetPathToFormula } from 'state/action/setPathToFormula';
import { reducer as reduceSetTitle } from 'state/action/setTitle';

//==============================================================================

const defaultState = {
	title: 'Document Title',
	path: [],
	selectedNodes: [],

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
	reduceRemoveNode,
	reduceSelectNode,
	reduceSetPath,
	reduceSetPathToFormula,
	reduceSetTitle,
];

export default ( state: AppState = defaultState, action: Action ): AppState => reducers.reduce(
	( localState, reducer ) => reducer( localState, action ),
	state,
);