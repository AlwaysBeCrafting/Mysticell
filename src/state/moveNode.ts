import { Node, NodeMap } from 'data/doc';
import { Position } from 'data/shared';
import Action, { MoveNodeAction } from './action';

export const reducer = ( state: NodeMap, action: Action ): NodeMap => {
	if ( action.type === 'MOVE_NODE' && state.get( action.id )) {
		const newNodes: NodeMap = new Map( state );
		const movedNode: Node = { ...state.get( action.id ), position: action.position };
		newNodes.set( action.id, movedNode );
		return newNodes;
	}
	return state;
};

export default ( id: number, position: Position ): MoveNodeAction => ({ type: 'MOVE_NODE', id, position });
