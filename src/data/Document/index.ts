import { Document } from './model';

import { Action, ActionTypes } from './actions';
import { documentJsonToState } from './model';


export default ( state: Document, action: Action ): Document => {
	switch ( action.type ) {
		case ActionTypes.LOAD_DOCUMENT:
			return documentJsonToState( action.payload.documentJson );

		default:
			return state;
	}
};

export { Document };
