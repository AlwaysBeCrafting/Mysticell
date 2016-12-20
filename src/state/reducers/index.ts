import { combineReducers, Reducer } from 'redux';

import Doc, { docFromJSON, DocUI, NodeMap } from 'data/doc';
import DocJSON from 'data/docJson';

import Action from 'state/action';

import { reducer as reduceAddNode       } from 'state/addNode';
import { reducer as reduceCollapseField } from 'state/collapseField';
import { reducer as reduceExpandField   } from 'state/expandField';
import { reducer as reduceMoveNode      } from 'state/moveNode';
import { reducer as reduceSetPath       } from 'state/setPath';

export interface AppState {
	doc: Doc;
	path: string[];
	ui: DocUI;
}

const exampleDoc = require<DocJSON>('data/exampleDoc.json');

//==============================================================================

const reducePath = ( state: string[] = [], action: Action ) => reduceSetPath( state, action );

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

const nodeActionReducers = [ reduceMoveNode ];

const reduceNodes = ( state: NodeMap = new Map(), action: Action ) => nodeActionReducers.reduce(
	( acc, reduce ) => reduce( acc, action ),
	state,
);

//------------------------------------------------------------------------------

const reduceSomethingElse = ( state: any, action: Action ) => ({
	...state,
	nodes: reduceNodes( state.nodes, action ),
});

const docActionReducers = [ reduceSomethingElse, reduceAddNode ];

const reduceDoc = ( state = docFromJSON( exampleDoc ), action: Action ) => docActionReducers.reduce(
	( acc, reduce: (acc: any, action: Action) => any ) => reduce( acc, action ),
	state,
);

const reduceDoc2 = combineReducers({
	nodes: reduceNodes,
});

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

const expandedFieldActionReducers = [
	reduceExpandField,
	reduceCollapseField,
];

const reduceExpandedFields = ( state: Set<number> = new Set(), action: Action ): Set<number> => expandedFieldActionReducers.reduce(
	( acc, reduce ) => reduce( acc, action ),
	state,
);

//------------------------------------------------------------------------------

const reduceUi: Reducer<DocUI> = combineReducers( {
	expandedFields: reduceExpandedFields,
} ) as Reducer<DocUI>;

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

export default combineReducers<AppState>( {
	doc:  reduceDoc,
	path: reducePath,
	ui:   reduceUi,
} );
