import { Id } from 'common/types';
import { generateForPrimitive } from 'common/util/id';

import PrimitiveNodeDefinition, * as PrimitiveDefs from './Primitives';
import { addIdToNamedExports } from './util';


interface PrimitiveNode extends PrimitiveNodeDefinition, Id {}
const Primitives = addIdToNamedExports( PrimitiveDefs, generateForPrimitive );


export { PrimitiveNode, Primitives };

export { Connection } from './Connection';
export { Node } from './Node';
export { UserNode } from './UserNode';
export { Param } from './Param';
