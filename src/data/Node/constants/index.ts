import { Id } from 'common/types';
import { addIdToNamedExports, generateForPrimitive } from 'common/util';
import { PrimitiveNodeDefinition } from 'data/Node/model';

import * as PrimitiveDefs from './primitives';


interface PrimitiveNode extends PrimitiveNodeDefinition, Id {}
const Primitives = addIdToNamedExports( PrimitiveDefs, generateForPrimitive );


export { PrimitiveNode, Primitives };
