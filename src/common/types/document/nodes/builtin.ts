import { ErrorParam, Node } from "./index";

const err = ( message ): ErrorParam  => ({
	type: "error",
	value: "ERR",
	message,
});

export const ADD: Node = {
	id: -1,
	name: "Add",
	inputNames: [ "A", "B" ],
	outputNames: [ "Sum" ],
	exec: ( a, b ) => {
		if ( a.type === "number" && b.type === "number" ) {
			return [{ type: "number", value: a.value + b.value }];
		}
		return [err( "Both arguments to Add must be numbers" )];
	},
};

export const SUBTRACT: Node = {
	id: -2,
	name: "Subtract",
	inputNames: [ "A", "B" ],
	outputNames: [ "Difference" ],
	exec: ( a, b ) => {
		if ( a.type === "number" && b.type === "number" ) {
			return [{ type: "number", value: a.value - b.value }];
		}
		return [err( "Both arguments to Subtract must be numbers" )];
	},
};

export const MULTIPLY: Node = {
	id: -3,
	name: "Multiply",
	inputNames: [ "A", "B" ],
	outputNames: [ "Product" ],
	exec: ( a, b ) => {
		if ( a.type === "number" && b.type === "number" ) {
			return [{ type: "number", value: a.value * b.value }];
		}
		return [err( "Both arguments to Multiply must be numbers" )];
	},
};

export const DIVIDE: Node = {
	id: -4,
	name: "Divide",
	inputNames: [ "A", "B" ],
	outputNames: [ "Quotient" ],
	exec: ( a, b ) => {
		if ( a.type === "number" && b.type === "number" ) {
			return [{ type: "number", value: a.value / b.value }];
		}
		return [err( "Both arguments to Divide must be numbers" )];
	},
};
