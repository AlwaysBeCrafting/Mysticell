import { Position } from 'data/shared';
import { NodeState } from 'state';
import Action, { AddNodeAction, MoveNodeAction } from 'state/action';

//==============================================================================

export default ( nodes: Map<number, NodeState> = new Map(), action: Action ): Map<number, NodeState> => {
	switch ( action.type ) {
		case 'ADD_NODE':

			const node: NodeState = {
				id:         Math.floor( Math.random() * 1000000 ),
				fxn:        action.fxn,
				inputNodes: [],
				label:      'Add',
				position:   { x: 0, y: 0 },
			};
			return new Map( nodes ).set( node.id, node );

		case 'MOVE_NODE':
			const newNodes: Map<number, NodeState> = new Map( nodes );
			const movedNode: NodeState = { ...nodes.get( action.nodeId ), position: action.position };
			newNodes.set( action.nodeId, movedNode );
			return newNodes;

		default: return nodes;
	}
};

//------------------------------------------------------------------------------

export const addNode = (
	fieldId: number,
	nodeId: number,
	fxn: string,
): AddNodeAction => ({ type: 'ADD_NODE', fieldId, nodeId, fxn });

export const moveNode = (
	nodeId: number,
	position: Position,
): MoveNodeAction => ({ type: 'MOVE_NODE', nodeId, position });
