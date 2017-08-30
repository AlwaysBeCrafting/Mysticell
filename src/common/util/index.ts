interface Dict<T> {
	[key: string]: T;
}

type Converter<In, Out> = ( id: string, input: In ) => Out;

const dictToMap = <In, Out>( dict: Dict<In>, convert: Converter<In, Out> ): Map<string, Out> => (
	Object.keys( dict ).reduce(
		( map, id ) => map.set( id, convert( id, dict[id] )),
		new Map(),
	)
);


export { dictToMap };
export { formulaLayoutWidth } from './layout';
export { connectedInputs } from './graph';
export * from './id';
