import { NodeState } from '.';

import { Fxn } from 'data/fxn';

const createId = (): number => Math.floor( Math.random() * 1000000 );

export const createNode = ( fxn: Fxn ): NodeState => ({
	fxn,
	id:         createId(),
	inputNodes: [],
	label:      fxn.name,
	position:   { x: 0, y: 0 },
});
