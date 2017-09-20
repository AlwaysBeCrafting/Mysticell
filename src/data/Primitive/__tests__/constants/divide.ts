import {PARAMS as P} from "data/common";

import {constants} from "../../constants";


const divide = constants.divide.exec;

describe("divide primitive", () => {
	it("returns exactly one value", () => {
		expect(divide(P.number(6), P.number(2)))
			.toHaveLength(1);
	});

	it("returns the product of two numbers", () => {
		expect(divide(P.number(6), P.number(2)))
			.toEqual([P.number(3)]);
	});

	it("converts a numeric string to a number", () => {
		expect(divide(P.number(6), P.string("2")))
			.toEqual(divide(P.number(6), P.number(2)));
	});

	it("returns an error from a non-numeric string", () => {
		expect(divide(P.number(6), P.string("A"))[0])
			.toHaveProperty("type", "error");
		expect(divide(P.number(6), P.string("-"))[0])
			.toHaveProperty("type", "error");
	});

	it("treats empty parameters as 1", () => {
		expect(divide(P.number(6), P.empty()))
			.toEqual(divide(P.number(6), P.number(1)));
	});

	it("treats whitespace-only strings as empty", () => {
		expect(divide(P.number(6), P.string("")))
			.toEqual(divide(P.number(6), P.empty()));
		expect(divide(P.number(6), P.string(" ")))
			.toEqual(divide(P.number(6), P.empty()));
	});

	it("treats missing parameters as empty", () => {
		expect(divide())
			.toEqual(divide(P.empty(), P.empty()));
		expect(divide(P.number(6)))
			.toEqual(divide(P.number(6), P.empty()));
	});

	it("returns an error if given an array", () => {
		expect(divide(P.number(6), P.array([]))[0])
			.toHaveProperty("type", "error");
	});
});
