import AppState, { NodeState } from 'state';

import Action from 'state/action';

export interface UpdateNodeInputAction {
	type: 'UPDATE_NODE_INPUT';
	nodeId: number;
	inputIndex: number;
	inputValue: string|number;
}

export const reducer = ( state: AppState, action: Action ): AppState => {
	if ( action.type !== 'UPDATE_NODE_INPUT' ) { return state; }

	const { nodeId, inputIndex, inputValue } = action;
	const node = state.nodes.get( nodeId );
	if ( !node ) { return state; }

	const newInputValues = [ ...node.inputValues ];
	newInputValues[inputIndex] = inputValue;

	const newNode = {
		...node,
		inputValues: newInputValues,
		outputValue: node.fxn.exec( ...newInputValues ),
	};

	return {
		...state,
		nodes: new Map( state.nodes ).set( node.id, newNode ),
	};
};

export default (
	nodeId: number,
	inputIndex: number,
	inputValue: string|number,
): UpdateNodeInputAction => ({
	type: 'UPDATE_NODE_INPUT',
	nodeId,
	inputIndex,
	inputValue,
});
