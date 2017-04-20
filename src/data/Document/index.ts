import { Document } from './model';

import { Action, ActionTypes } from './actions';
import { documentJsonToState } from './model';


const defaultState: Document = {
	id: 'DOCUMENT-0000',
	title: 'Untitled',

	cells: new Map(),
	sheets: new Map(),
	nodes: new Map(),

	layout: new Map(),
};


export default ( state: Document = defaultState, action: Action ): Document => {
	switch ( action.type ) {
		case ActionTypes.LOAD_DOCUMENT:
			return documentJsonToState( action.payload.documentJson );

		default:
			return state;
	}
};

export { Document };
