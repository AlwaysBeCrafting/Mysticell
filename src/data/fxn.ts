export interface Fxn {
	name: string;
	inputs: string[];
	output: string;
	exec: (...params: Array<number | string>) => number | string;
}

export const ADD: Fxn = {
	name:   'Add',
	inputs: [ 'A', 'B' ],
	output: 'Sum',
	exec:   ( a: number, b: number ) => a + b,
};

export const SUBTRACT: Fxn = {
	name:   'Subtract',
	inputs: [ 'A', 'B' ],
	output: 'Difference',
	exec:   ( a: number, b: number ) => a - b,
};

export const MULTIPLY: Fxn = {
	name:   'Multiply',
	inputs: [ 'A', 'B' ],
	output: 'Product',
	exec:   ( a: number, b: number ) => a * b,
};

export const DIVIDE: Fxn = {
	name:   'Divide',
	inputs: [ 'A', 'B' ],
	output: 'Quotient',
	exec:   ( a: number, b: number ) => a / b,
};

export const SQRT: Fxn = {
	name:   'Square Root',
	inputs: [ 'Number' ],
	output: 'Square root',
	exec:   Math.sqrt,
};

export const POWER: Fxn = {
	name:   'Power',
	inputs: [ 'Number', 'Exponent' ],
	output: 'Result',
	exec:   ( a: number, b: number ) => a ** b,
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

