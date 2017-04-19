import { Id } from 'common/types';
import { addIdToNamedExports, generateForPrimitive } from 'common/util';

import PrimitiveNodeDefinition, * as PrimitiveDefs from './Primitives';


interface PrimitiveNode extends PrimitiveNodeDefinition, Id {}
const Primitives = addIdToNamedExports( PrimitiveDefs, generateForPrimitive );


export { PrimitiveNode, Primitives };

export { Connection } from './Connection';
export { Node } from './Node';
export { UserNode } from './UserNode';
export { Param } from './Param';
