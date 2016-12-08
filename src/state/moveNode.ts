import { NodeMap } from 'data/doc';
import { Position } from 'data/shared';
import Action, { MoveNodeAction } from './action';

export const reducer = ( state: NodeMap, action: Action ) => {
	if ( action.type === 'MOVE_NODE' && state[action.id] ) {
		return { ...state, [action.id]: { ...state[action.id], position: action.position } };
	}
	return state;
};

export default ( id: number, position: Position ): MoveNodeAction => ({ type: 'MOVE_NODE', id, position });
