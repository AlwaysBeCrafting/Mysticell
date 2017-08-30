import { Document } from './model';

import { Action, ActionTypes } from './actions';


const defaultState: Document = {
	id: 'DOCUMENT-0000',
	title: 'Untitled',

	cells: {},
	sheets: {},
	formulas: {},
	nodes: {},

	tree: [],
};

const reducer = ( state: Document = defaultState, action: Action ): Document => {
	switch ( action.type ) {
		case ActionTypes.LOAD_DOCUMENT:
			return { ...state, ...action.payload.documentJson };

		default:
			return state;
	}
};


export { reducer };
