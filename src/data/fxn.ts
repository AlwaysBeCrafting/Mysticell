export interface Fxn {
	name: string;
	inputNames: string[];
	outputName: string;
	exec: (...params: Array<number|string|undefined>) => number|string|undefined;
}

export const ADD: Fxn = {
	name: "Add",
	inputNames: [ "A", "B" ],
	outputName: "Sum",
	exec: ( a: number|string|undefined, b: number|string|undefined ) => {
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
	name:   "Subtract",
	inputNames: [ "A", "B" ],
	outputName: "Difference",
	exec:   ( a: number, b: number ) => +a - +b,
};

export const MULTIPLY: Fxn = {
	name:   "Multiply",
	inputNames: [ "A", "B" ],
	outputName: "Product",
	exec:   ( a: number, b: number ) => +a * +b,
};

export const DIVIDE: Fxn = {
	name:   "Divide",
	inputNames: [ "A", "B" ],
	outputName: "Quotient",
	exec:   ( a: number, b: number ) => +a / +b,
};

export const SQRT: Fxn = {
	name:   "Square Root",
	inputNames: [ "Number" ],
	outputName: "Square root",
	exec:   Math.sqrt,
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
