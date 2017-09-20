import {Dict} from "common/types";

import {Param, PARAMS} from "data/common";

import {Primitive} from "./model";


const padEmpty = (params: Param[], length: number) => (
	params
		.map(p => p || PARAMS.empty())
		.concat(Array(length - params.length).fill(PARAMS.empty()))
);

const paramToNumber = (identity: number) => (param: Param): Param => {
	switch (param.type) {
		case "array": {
			return PARAMS.error("Number expected");
		}
		case "empty": {
			return PARAMS.number(identity);
		}
		case "string": {
			const converted = +param.value;
			if (Number.isNaN(converted)) {
				return PARAMS.error("Number expected");
			} else {
				return PARAMS.number(converted);
			}
		}
		case "error":
		case "number": {
			return param;
		}
	}
};

type Operator = (...nums: number[]) => number;

const verifyAndReduce = (params: Param[], identity: number, op: Operator): Param[] => {
	const convParams = params.map(paramToNumber(identity));
	const error = convParams.find(param => param.type === "error");
	if (error) { return [error]; }
	const result = op(...convParams.map(param => param.value as number));
	return [PARAMS.number(result)];
};

const add: Primitive = {
	id: "PRIMITIVE-add",
	type: "primitive",
	name: "Add",
	inputNames: ["A", "B"],
	outputNames: ["Sum"],
	exec: (a, b) => (
		verifyAndReduce(
			padEmpty([a, b], 2),
			0,
			(x, y) => x + y,
		)
	),
};

const subtract: Primitive = {
	id: "PRIMITIVE-subtract",
	type: "primitive",
	name: "Subtract",
	inputNames: ["A", "B"],
	outputNames: ["Difference"],
	exec: (a, b) => (
		verifyAndReduce(
			padEmpty([a, b], 2),
			0,
			(x, y) => x - y,
		)
	),
};

const multiply: Primitive = {
	id: "PRIMITIVE-multiply",
	type: "primitive",
	name: "Multiply",
	inputNames: ["A", "B"],
	outputNames: ["Product"],
	exec: (a, b) => (
		verifyAndReduce(
			padEmpty([a, b], 2),
			1,
			(x, y) => x * y,
		)
	),
};

const divide: Primitive = {
	id: "PRIMITIVE-divide",
	type: "primitive",
	name: "Divide",
	inputNames: ["A", "B"],
	outputNames: ["Quotient"],
	exec: (a, b) => (
		verifyAndReduce(
			padEmpty([a, b], 2),
			1,
			(x, y) => x / y,
		)
	),
};

const floor: Primitive = {
	id: "PRIMITIVE-floor",
	type: "primitive",
	name: "Floor",
	inputNames: ["Num"],
	outputNames: ["Floor"],
	exec: a => (
		verifyAndReduce(
			padEmpty([a], 1),
			0,
			Math.floor,
		)
	),
};

const constants = {add, subtract, multiply, divide, floor};

const PRIMITIVES: Dict<Primitive> = Object.keys(constants).reduce(
	(prior, key) => ({
		...prior,
		[constants[key].id]: constants[key],
	}),
	{},
);


export {constants, PRIMITIVES};
