import { combineReducers } from 'redux';

import DocJSON from 'data/docJson';
import importDoc from 'data/importDoc';

import Action from './action';

import { reducer as reduceAddNode  } from './addNode';
import { reducer as reduceCollapseField } from './collapseField';
import { reducer as reduceExpandField   } from './expandField';
import { reducer as reduceMoveNode } from './moveNode';
import { reducer as reduceSetPath       } from './setPath';

const exampleDoc = require<DocJSON>('data/exampleDoc.json');

// ==============================================================================

const reducePath = ( state = [], action: Action ) => reduceSetPath( state, action );

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

const reduceNodes = ( state = {}, action: Action ) => [
	reduceMoveNode,
].reduce(
	( acc, reduce ) => reduce( acc, action ),
	state,
);

// ------------------------------------------------------------------------------

const reduceDoc = ( state = importDoc( exampleDoc ), action: Action ) => [
	(localState: any) => ({
		...localState,
		nodes: reduceNodes( localState.nodes, action ),
	}),
	reduceAddNode,
].reduce(
	( acc, reduce: (acc: any, action: Action) => any ) => reduce( acc, action ),
	state,
);

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

const reduceExpandedFields = ( state = {}, action: Action ) => [
	reduceExpandField,
	reduceCollapseField,
].reduce(
	( acc, reduce ) => reduce( acc, action ),
	state,
);

// ------------------------------------------------------------------------------

const reduceUi = combineReducers( {
	expandedFields: reduceExpandedFields,
} );

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

export default combineReducers( {
	doc:  reduceDoc,
	path: reducePath,
	ui:   reduceUi,
} );
