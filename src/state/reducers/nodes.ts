import Doc, { Node } from 'data/doc';
import { Position } from 'data/shared';
import Action, { AddNodeAction, MoveNodeAction } from 'state/action';

//==============================================================================

const reduceAddNode = (
	nodes: Map<number, Node> = new Map(),
	action: Action,
): Map<number, Node> => {
	if ( action.type === 'ADD_NODE' ) {

		const node: Node = {
			id:        Math.floor( Math.random() * 1000000 ),
			fxn: action.fxn,
			inputNodes: [],
			label:      'Add',
			position:   { x: 0, y: 0 },
		};

		return new Map( nodes ).set( node.id, node );
	}
	return nodes;
};

const reduceMoveNode = ( state: Map<number, Node>, action: Action ): Map<number, Node> => {
	if ( action.type === 'MOVE_NODE' && state.get( action.id )) {
		const newNodes: Map<number, Node> = new Map( state );
		const movedNode: Node = { ...state.get( action.id ), position: action.position };
		newNodes.set( action.id, movedNode );
		return newNodes;
	}
	return state;
};

//------------------------------------------------------------------------------

const reducerList = [
	reduceAddNode,
	reduceMoveNode,
];

export default (
	nodes: Map<number, Node> = new Map(),
	action: Action,
) => reducerList.reduce(
	( acc, reduce ) => reduce( acc, action ),
	nodes,
);

//------------------------------------------------------------------------------

export const addNode = (
	fieldId: number,
	nodeId: number,
	fxn: string,
): AddNodeAction => ({ type: 'ADD_NODE', fieldId, nodeId, fxn });

export const moveNode = (
	id: number,
	position: Position,
): MoveNodeAction => ({ type: 'MOVE_NODE', id, position });
