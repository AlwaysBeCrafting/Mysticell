import { combineReducers } from 'redux';

import exampleDoc from 'data/exampleDoc.json';
import importDoc from 'data/importDoc';


import { reducer as reduceMoveNode } from './moveNode';


import { reducer as reduceSetPath       } from './setPath';
import { reducer as reduceExpandField   } from './expandField';
import { reducer as reduceCollapseField } from './collapseField';

//==============================================================================

const reducePath = ( state = [], action ) => reduceSetPath( state, action );

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

const reduceNodes = ( state = {}, action ) => [
	reduceMoveNode,
].reduce(
	( acc, reduce ) => reduce( acc, action ),
	state,
);

//------------------------------------------------------------------------------

const reduceDoc = ( state = importDoc( exampleDoc ), action ) => ({
	...state,
	nodes: reduceNodes( state.nodes, action ),
});

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

const reduceExpandedFields = ( state = {}, action ) => [
	reduceExpandField,
	reduceCollapseField,
].reduce(
	( acc, reduce ) => reduce( acc, action ),
	state,
);

//------------------------------------------------------------------------------

const reduceUi = combineReducers( {
	expandedFields: reduceExpandedFields,
} );

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

export default combineReducers( {
	path: reducePath,
	doc:  reduceDoc,
	ui:   reduceUi,
} );
