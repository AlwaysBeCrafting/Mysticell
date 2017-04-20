import { Action, ActionTypes } from './actions';
import { UserNode } from './model';



export default ( state = new Map(), action: Action ): Map<string, UserNode> => {
	switch ( action.type ) {

		case ActionTypes.CREATE_NODE:
			// Create a new node
			return new Map( state ); //.set( newNode.id, newNode );

		case ActionTypes.DELETE_NODE:
			const copiedGraph = new Map( state );
			copiedGraph.delete( action.payload.nodeId );
			return copiedGraph;

		case ActionTypes.CONNECT_NODE:
			// Create connected node copy
			return new Map( state ); //.set( connectedNode.id, connectedNode );

		case ActionTypes.DISCONNECT_NODE:
			// Create disconnected node copy
			return new Map( state ); //.set( disconnectedNode.id, disconnectedNode );

		case ActionTypes.UPDATE_NODE:
			// Do all the heavy lifting
			return new Map( state );

		default: return state;
	}
};
