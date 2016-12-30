import { NodeState } from '.';

const createId = (): number => Math.floor( Math.random() * 1000000 );

export const createNode = ( fxn: string ): NodeState => ({
	fxn,
	id:         createId(),
	inputNodes: [],
	label:      'Add',
	position:   { x: 0, y: 0 },
});
