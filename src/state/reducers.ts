import { combineReducers, Reducer } from 'redux';

import Doc, { docFromJSON, DocUI, NodeMap } from 'data/doc';
import DocJSON from 'data/docJson';

import Action from './action';

import { reducer as reduceAddNode       } from './addNode';
import { reducer as reduceCollapseField } from './collapseField';
import { reducer as reduceExpandField   } from './expandField';
import { reducer as reduceMoveNode      } from './moveNode';
import { reducer as reduceSetPath       } from './setPath';

const exampleDoc = require<DocJSON>('data/exampleDoc.json');

// ==============================================================================

const reducePath = ( state = [], action: Action ) => reduceSetPath( state, action );

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

const reduceNodes = ( state: NodeMap = new Map(), action: Action ) => [
	reduceMoveNode,
].reduce(
	( acc, reduce ) => reduce( acc, action ),
	state,
);

// ------------------------------------------------------------------------------

const reduceDoc = ( state = docFromJSON( exampleDoc ), action: Action ) => [
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

const reduceExpandedFields = ( state: Set<number> = new Set(), action: Action ): Set<number> => [
	reduceExpandField,
	reduceCollapseField,
].reduce(
	( acc, reduce ) => reduce( acc, action ),
	state,
);

// ------------------------------------------------------------------------------

const reduceUi: Reducer<DocUI> = combineReducers( {
	expandedFields: reduceExpandedFields,
} ) as Reducer<DocUI>;

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

export default combineReducers( {
	doc:  reduceDoc,
	path: reducePath,
	ui:   reduceUi,
} );
