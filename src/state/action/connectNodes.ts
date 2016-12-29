import AppState, { NodeState } from 'state';

import Action from 'state/action';

export interface ConnectNodesAction {
	type: 'CONNECT_NODES';
	nodeFrom: NodeState;
	nodeTo: NodeState;
	toIndex: number;
}

export const reducer = ( state: AppState, action: Action ): AppState => {
	if ( action.type !== 'CONNECT_NODES' ) { return state; }

	const { nodeFrom, nodeTo, toIndex } = action;

	const newInputNodes = [...nodeTo.inputNodes];
	newInputNodes[toIndex] = nodeFrom.id;

	const newNode = {
		...nodeTo,
		inputNodes: newInputNodes,
	};

	return {
		...state,
		nodes: new Map( state.nodes ).set( nodeTo.id, newNode ),
	};
};

export default ( nodeFrom: NodeState, nodeTo: NodeState, toIndex: number ): ConnectNodesAction => ({
	type: 'CONNECT_NODES',
	nodeFrom,
	nodeTo,
	toIndex,
});
