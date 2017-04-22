import * as shortid from 'shortid';

const userNamespace = 'USER';
const primitiveNamespace = 'PRIM';

export const generate = ( namespace: string ) => `${namespace}-${shortid.generate()}`;
export const generateForUser = () => generate( userNamespace );
export const generateForPrimitive = ( name: string ) => {
	const id = `${primitiveNamespace}-${name}`;
	if ( !shortid.isValid( id )) { throw new Error( `Not a valid shortid: ${ id }` ); }
	return id;
};
