import shortid from "shortid";


const graphNamespace = "GRAPH";
const primitiveNamespace = "PRIMITIVE";

const generate = (namespace: string) => `${namespace}-${shortid.generate()}`;
const generateForGraph = () => generate(graphNamespace);
const generateForPrimitive = (name: string) => {
	const id = `${primitiveNamespace}-${name}`;
	if (!shortid.isValid(id)) {throw new Error(`Not a valid shortid: ${id}`);}
	return id;
};


export {generate, generateForGraph, generateForPrimitive};
