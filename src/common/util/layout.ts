import { Position } from 'common/types';


const layoutGridWidth = ( layout: Map<string, Position> ) => (
	Array.from( layout.values() )
		.reduce(( max, current ) => current.x > max ? current.x : max, 2 )
		+ 6
);


export { layoutGridWidth };
