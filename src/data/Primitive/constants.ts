import {params} from "data/common";

import {Primitive} from "./model";


const add: Primitive = {
	id: "PRIMITIVE-add",
	type: "primitive",
	name: "Add",
	inputNames: ["A", "B"],
	outputNames: ["Sum"],
	exec: (a, b) => {
		if (a.type === "number" && b.type === "number") {
			return [{type: "number", value: a.value + b.value}];
		}
		return [params.error("Both arguments to Add must be numbers")];
	},
};

const subtract: Primitive = {
	id: "PRIMITIVE-subtract",
	type: "primitive",
	name: "Subtract",
	inputNames: ["A", "B"],
	outputNames: ["Difference"],
	exec: (a, b) => {
		if (a.type === "number" && b.type === "number") {
			return [{type: "number", value: a.value - b.value}];
		}
		return [params.error("Both arguments to Subtract must be numbers")];
	},
};

const multiply: Primitive = {
	id: "PRIMITIVE-multiply",
	type: "primitive",
	name: "Multiply",
	inputNames: ["A", "B"],
	outputNames: ["Product"],
	exec: (a, b) => {
		if (a.type === "number" && b.type === "number") {
			return [{type: "number", value: a.value * b.value}];
		}
		return [params.error("Both arguments to Multiply must be numbers")];
	},
};

const divide: Primitive = {
	id: "PRIMITIVE-divide",
	type: "primitive",
	name: "Divide",
	inputNames: ["A", "B"],
	outputNames: ["Quotient"],
	exec: (a, b) => {
		if (a.type === "number" && b.type === "number") {
			return [{type: "number", value: a.value / b.value}];
		}
		return [params.error("Both arguments to Divide must be numbers")];
	},
};

const floor: Primitive = {
	id: "PRIMITIVE-floor",
	type: "primitive",
	name: "Floor",
	inputNames: ["Num"],
	outputNames: ["Floor"],
	exec:  a => {
		if (a.type === "number") {
			return [{type: "number", value: Math.floor(a.value)}];
		}
		return [params.error("Argument to Floor must be a number")];
	},
};

const constants = {add, subtract, multiply, divide, floor};

const PRIMITIVES = Object.keys(constants).reduce(
	(map, key) => ({
		...map,
		[constants[key].id]: constants[key],
	}),
	{},
);


export {PRIMITIVES};
