import AppState, { NodeState } from 'state';
import Action from 'state/action';

export interface SelectNodeAction {
	type: 'SELECT_NODE';
	nodeId: number;
}

export const reducer = ( state: AppState, action: Action ): AppState => {
	if ( action.type !== 'SELECT_NODE' ) { return state; }

	return {
		...state,
		selectedNodes: [action.nodeId],
	};
};

export default ( nodeId: number, position: Position ): SelectNodeAction => ({
	type: 'SELECT_NODE',
	nodeId,
});
