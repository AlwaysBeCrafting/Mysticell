type Param = number|string|undefined;

const stringDivide = ( original: string, substring: string ) => {
	let index = 0;
	let count = 0;
	while ( index < original.length ) {
		if ( !original.startsWith( substring, index )) {
			return 0;
		}
		count += 1;
		index += substring.length;
	}
	return count;
};

export interface Fxn {
	name: string;
	inputNames: string[];
	outputName: string;
	exec: (...params: Param[] ) => Param;
}

export const ADD: Fxn = {
	name: "Add",
	inputNames: [ "A", "B" ],
	outputName: "Sum",
	exec: ( a: Param, b: Param ) => {
		if ( typeof a === "number" && typeof b === "number" ) { return a + b; }

		const normA = a === "" ? undefined : a;
		const normB = b === "" ? undefined : b;

		if ( typeof normA !== "undefined" && typeof normB !== "undefined" ) {
			return normA.toString() + normB.toString();
		}

		return a || b;
	},
};

export const SUBTRACT: Fxn = {
	name: "Subtract",
	inputNames: [ "A", "B" ],
	outputName: "Difference",
	exec: ( a: Param, b: Param ) => {
		if ( typeof a === "number" && typeof b === "number" ) { return a - b; }

		const normA = a === "" ? undefined : a;
		const normB = b === "" ? undefined : b;

		if ( typeof normA === "string" && typeof normB !== "undefined" ) {
			return normA.substring( 0, normA.lastIndexOf( normB.toString() )) || normA;
		}

		return a || -b;
	},
};

export const MULTIPLY: Fxn = {
	name: "Multiply",
	inputNames: [ "A", "B" ],
	outputName: "Product",
	exec:   ( a: Param, b: Param ) => {
		if ( typeof a === "number" && typeof b === "number" ) { return a * b; }

		const normA = a === "" ? undefined : a;
		const normB = b === "" ? undefined : b;

		if ( typeof normA === "number" && typeof normB === "string" ) {
			return normB.repeat( normA );
		}
		if ( typeof normA === "string" && typeof normB === "number" ) {
			return normA.repeat( normB );
		}

		if ( typeof normA !== "string" && typeof normB !== "string" ) { return undefined; }

		return a || b;
	},
};

export const DIVIDE: Fxn = {
	name: "Divide",
	inputNames: [ "A", "B" ],
	outputName: "Quotient",
	exec: ( a: Param, b: Param ) => {
		if ( typeof a === "number" && typeof b === "number" ) { return a / b; }

		const normA = a === "" ? undefined : a;
		const normB = b === "" ? undefined : b;

		if ( typeof normA === "string" && typeof normB === "number" ) {
			return normA.substr( 0, normA.length / normB );
		}

		if ( typeof normA === "string" && typeof normB === "string" ) {
			return stringDivide( normA, normB );
		}

		return a;
	},
};

export const SQRT: Fxn = {
	name: "Square Root",
	inputNames: [ "Number" ],
	outputName: "Square root",
	exec: ( a: Param ) => {
		if ( typeof a === "number" ) { return Math.sqrt( a ); }
		return undefined;
	},
};

export const POWER: Fxn = {
	name:   "Power",
	inputNames: [ "Number", "Exponent" ],
	outputName: "Result",
	exec:   ( a: number, b: number ) => a ** +b,
};

export interface FxnLookup {
	[name: string]: Fxn;
}

export default {
	ADD,
	SUBTRACT,
	MULTIPLY,
	DIVIDE,
	SQRT,
	POWER,
} as FxnLookup;

export const fxnList = [
	ADD,
	SUBTRACT,
	MULTIPLY,
	DIVIDE,
	SQRT,
	POWER,
];
