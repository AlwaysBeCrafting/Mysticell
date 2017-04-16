import * as shortid from 'shortid';

const userNamespace = 'USER';
const primitiveNamespace = 'PRIM';

export const generate = ( namespace: string ) => `${namespace}-${shortid.generate()}`;
export const generateForUser = () => generate( userNamespace );
export const generateForPrimitive = ( name: string ) => {
	if ( !shortid.isValid( name )) throw new Error( `Not a valid shortid: ${ name }` );
	return `${primitiveNamespace}-${name}`;
};
