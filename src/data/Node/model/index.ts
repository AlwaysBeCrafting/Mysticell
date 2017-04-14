export { Connection } from './Connection';
export { Node } from './Node';
export { UserNode } from './UserNode';
export { PrimitiveNode } from './PrimitiveNode';
export { Param } from './Param';


import { generateForPrimitive } from 'common/util';
import * as NamedPrimitives from './Primitives';
const Primitives = Object.keys( NamedPrimitives )
	.reduce(( acc, prim ) => {
		acc[prim.id];
	});

export { Primitives };
