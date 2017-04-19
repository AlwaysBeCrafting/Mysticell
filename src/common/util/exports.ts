import { Id } from 'common/types';


type IdGenerator<T> = ( name: string, item?: T ) => string;


export const addIdToNamedExports = <T>( module: any, idGenerator: IdGenerator<T> ): Array<T & Id> => {
	const typedModule = module as { [key: string]: T };
	return Object.keys(module)
		.filter(( exportedName ) => exportedName !== 'default' )
		.map(( exportedName ) => {
			const exportedSymbol = typedModule[exportedName];
			const id = idGenerator( exportedName, exportedSymbol );
			return Object.assign({ id }, exportedSymbol); // Why doesn't this work w/ spread?
		});
};
