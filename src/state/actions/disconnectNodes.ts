import AppState, { NodeState } from 'state';

import Action from 'state/actions';

export interface DisconnectNodesAction {
	type: 'DISCONNECT_NODES';
	nodeTo: NodeState;
	indexTo: number;
}

export const reducer = ( state: AppState, action: Action ): AppState => {
	if ( action.type !== 'DISCONNECT_NODES' ) { return state; }

	const { nodeTo, indexTo } = action;

	const newInputNodes = [...nodeTo.inputNodes];
	newInputNodes[indexTo] = null;

	const newNode = {
		...nodeTo,
		inputNodes: newInputNodes,
	};

	return {
		...state,
		nodes: new Map( state.nodes ).set( nodeTo.id, newNode ),
	};
};

export default ( nodeTo: NodeState, indexTo: number ) => ({
	type: 'DISCONNECT_NODES',
	nodeTo,
	indexTo,
});
