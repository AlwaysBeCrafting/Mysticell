import { Dict } from "common/types";

import { Action, ActionTypes } from "./actions";
import { Node } from "./model";


const reducer = (state: Dict<Node> = {}, action: Action): Dict<Node> => {
	switch (action.type) {
		case ActionTypes.CREATE: {
			return {
				...state,
				[action.payload.node.id]: action.payload.node,
			};
		}
		case ActionTypes.DESTROY: {
			const nodes = {...state};
			delete nodes[action.payload.nodeId];
			return nodes;
		}
		case ActionTypes.SET_USER_VALUE: {
			const node = {...state[action.payload.nodeId]};
			node.userValues = [...node.userValues];
			node.userValues[action.payload.index] = action.payload.value;
			return {
				...state,
				[node.id]: node,
			};
		}
		default: return state;
	}
};


export { reducer };
