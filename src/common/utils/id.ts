import shortid from "shortid";


type IdNamespace =
	| "DOCUMENT"
	| "NODE"
	| "FORMULA"
	| "PRIMITIVE";

const generateId = (namespace: IdNamespace) => `${namespace}-${shortid.generate()}`;


export {generateId};
