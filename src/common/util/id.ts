import shortid from 'shortid';


const graphNamespace = 'GRAPH';
const primitiveNamespace = 'PRIMITIVE';


export const generate = ( namespace: string ) => `${namespace}-${shortid.generate()}`;
export const generateForGraph = () => generate( graphNamespace );
export const generateForPrimitive = ( name: string ) => {
	const id = `${primitiveNamespace}-${name}`;
	if ( !shortid.isValid( id )) { throw new Error( `Not a valid shortid: ${ id }` ); }
	return id;
};
