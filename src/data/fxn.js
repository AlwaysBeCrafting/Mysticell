const ADD = {
	name:   'Add',
	inputs: [ 'A', 'B' ],
	output: 'Sum',
	exec:   ( a, b ) => a + b,
};

const SUBTRACT = {
	name:   'Subtract',
	inputs: [ 'A', 'B' ],
	output: 'Difference',
	exec:   ( a, b ) => a - b,
};

const MULTIPLY = {
	name:   'Multiply',
	inputs: [ 'A', 'B' ],
	output: 'Product',
	exec:   ( a, b ) => a * b,
};

const DIVIDE = {
	name:   'Divide',
	inputs: [ 'A', 'B' ],
	output: 'Quotient',
	exec:   ( a, b ) => a / b,
};

const SQRT = {
	name:   'Square Root',
	inputs: [ 'Number' ],
	output: 'Square root',
	exec:   Math.sqrt,
};

const POWER = {
	name:   'Power',
	inputs: [ 'Number', 'Exponent' ],
	output: 'Result',
	exec:   ( a, b ) => a ** b,
};



export default {
	ADD,
	SUBTRACT,
	MULTIPLY,
	DIVIDE,
	SQRT,
	POWER,
};
