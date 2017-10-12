import { Dict } from "common/types";

import { Param, PARAMS } from "data/common";

import { Primitive } from "./model";


const padEmpty = (params: Param[], length: number) => (
	params
		.map(p => p || PARAMS.empty())
		.concat(Array(length - params.length).fill(PARAMS.empty()))
);

const paramToNumber = (identity: number) => (param: Param): Param => {
	switch (param.type) {
		case "empty": {
			return PARAMS.number(identity);
		}
		case "string": {
			if (!param.value.trim().length) {
				return PARAMS.number(identity);
			}
			const converted = +param.value;
			if (!Number.isNaN(converted)) {
				return PARAMS.number(converted);
			}
			break;
		}
		case "error":
		case "number": {
			return param;
		}
	}
	return PARAMS.error("TYPE", `Number expected, got ${param.type}`);
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

const PRIMITIVES: Dict<Primitive> = Object.values(constants).reduce(
	(prior, value) => ({
		...prior,
		[value.id]: value,
	}),
	{},
);


export { constants, PRIMITIVES };