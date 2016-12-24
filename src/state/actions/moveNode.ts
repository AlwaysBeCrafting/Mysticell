import { Position } from 'data/shared';
import AppState, { NodeState } from 'state';
import Action from 'state/actions';

export interface MoveNodeAction {
	type: 'MOVE_NODE';
	nodeId: number;
	position: Position;
}

export const reducer = ( state: AppState, action: Action ): AppState => {
	if ( action.type !== 'MOVE_NODE' ) { return state; }

	const movedNode = {
		...state.nodes.get( action.nodeId ),
		position: action.position,
	};

	return {
		...state,
		nodes: new Map( state.nodes ).set( action.nodeId, movedNode ),
	};
};

export default ( nodeId: number, position: Position ): MoveNodeAction => ({
	type: 'MOVE_NODE',
	nodeId,
	position,
});
