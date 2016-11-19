import { combineReducers } from 'redux';

import exampleDoc from 'data/exampleDoc.json';

import { reducer as reduceSetPath       } from './setPath';
import { reducer as reduceExpandField   } from './expandField';
import { reducer as reduceCollapseField } from './collapseField';

//==============================================================================

const reducePath = ( state = [], action ) => reduceSetPath( state, action );

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

const reduceDoc = ( state = exampleDoc, action ) => state;

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

const reduceExpandedFields = ( state = {}, action ) => [
	reduceExpandField,
	reduceCollapseField,
].reduce(
	( prevState, reduce ) => reduce( prevState, action ),
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
