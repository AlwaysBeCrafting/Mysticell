import { addIdToNamedExports, generateForPrimitive } from 'common/util';

import * as PrimitiveDefs from './primitives';


const Primitives = addIdToNamedExports( PrimitiveDefs, generateForPrimitive );


export { Primitives };
