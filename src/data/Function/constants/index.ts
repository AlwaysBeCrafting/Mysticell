import { generateForPrimitive } from 'common/util';

import * as PrimitiveDefs from './primitives';


const Primitives = Object.keys( PrimitiveDefs ).reduce(
	( exportedPrimitives, key ) => {
		const id = generateForPrimitive( key );
		exportedPrimitives[id] = { ...PrimitiveDefs[key], id };
		return exportedPrimitives;
	},
	{},
);


export { Primitives };
