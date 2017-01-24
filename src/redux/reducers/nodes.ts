import * as nodes from "redux/actions/nodes";
import { NodeState } from "redux/state";

const initialState: Map<number, NodeState> = new Map();

export const reducer = (
	state = initialState,
	action: nodes.Actions,
): Map<number, NodeState> => {
	switch ( action.type ) {

		case nodes.ActionTypes.ADD_NODE:
			const addedNode = action.payload.node;
			return new Map( state ).set( addedNode.id, addedNode );

		case nodes.ActionTypes.REMOVE_NODE:
			const removedNode = action.payload.node;
			const clonedState = new Map( state );
			clonedState.delete( removedNode.id );
			return clonedState;

		case nodes.ActionTypes.MOVE_NODE:
			const movedNode = action.payload.node;
			return new Map( state ).set(
				movedNode.id,
				{
					...movedNode,
					position: action.payload.position,
				},
			);

		case nodes.ActionTypes.CONNECT_NODE:
			const connectedFrom = action.payload.fromNode;
			const connectedIndex = action.payload.toIndex;
			const connectedTo = {
				...action.payload.toNode,
				inputNodes: [ ...action.payload.toNode.inputNodes ],
			};
			connectedTo.inputNodes[connectedIndex] = connectedFrom.id;
			return new Map( state ).set( connectedTo.id, connectedTo );

		default: return state;
	}
};
