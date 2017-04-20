import { Action, ActionTypes } from './actions';
import { UserNode } from './model';


export default ( state = new Map(), action: Action ): Map<string, UserNode> => {
	switch ( action.type ) {

		case ActionTypes.CREATE_NODE:
			return new Map( state ).set( action.payload.node.id, action.payload.node );

		case ActionTypes.DELETE_NODE:
			const copiedGraph = new Map( state );
			copiedGraph.delete( action.payload.nodeId );
			return copiedGraph;

		case ActionTypes.CONNECT_NODE:
			return new Map( state );

		case ActionTypes.DISCONNECT_NODE:
			return new Map( state );

		case ActionTypes.UPDATE_NODE:
			return new Map( state );

		default: return state;
	}
};
