import { IdMap } from 'common/types';

import { Action, ActionTypes } from './actions';
import { Node } from './model';


export default ( state: IdMap<Node> = {}, action: Action ): IdMap<Node> => {
	switch ( action.type ) {
		case ActionTypes.CREATE: {
			return {
				...state,
				[action.payload.node.id]: action.payload.node,
			};
		}
		case ActionTypes.DESTROY: {
			const nodes = { ...state };
			delete nodes[action.payload.nodeId];
			return nodes;
		}
		case ActionTypes.SET_INPUT_VALUE: {
			const node = { ...state[action.payload.nodeId] };
			node.userValues = [ ...node.userValues ];
			node.userValues[action.payload.index] = action.payload.value;
			return {
				...state,
				[node.id]: node,
			};
		}
		default: return state;
	}
};
