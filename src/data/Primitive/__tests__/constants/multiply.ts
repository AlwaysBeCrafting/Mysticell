import {PARAMS as P} from "data/common";

import {constants} from "../../constants";


const multiply = constants.multiply.exec;

describe("multiply primitive", () => {
	it("returns exactly one value", () => {
		expect(multiply(P.number(3), P.number(2)))
			.toHaveLength(1);
	});

	it("returns the product of two numbers", () => {
		expect(multiply(P.number(3), P.number(2)))
			.toEqual([P.number(6)]);
	});

	it("converts a numeric string to a number", () => {
		expect(multiply(P.number(3), P.string("2")))
			.toEqual(multiply(P.number(3), P.number(2)));
	});

	it("returns an error from a non-numeric string", () => {
		expect(multiply(P.number(3), P.string("A"))[0])
			.toHaveProperty("type", "error");
		expect(multiply(P.number(3), P.string("-"))[0])
			.toHaveProperty("type", "error");
	});

	it("treats empty parameters as 1", () => {
		expect(multiply(P.number(3), P.empty()))
			.toEqual(multiply(P.number(3), P.number(1)));
	});

	it("treats whitespace-only strings as empty", () => {
		expect(multiply(P.number(3), P.string("")))
			.toEqual(multiply(P.number(3), P.empty()));
		expect(multiply(P.number(3), P.string(" ")))
			.toEqual(multiply(P.number(3), P.empty()));
	});

	it("treats missing parameters as empty", () => {
		expect(multiply())
			.toEqual(multiply(P.empty(), P.empty()));
		expect(multiply(P.number(3)))
			.toEqual(multiply(P.number(3), P.empty()));
	});

	it("returns an error if given an array", () => {
		expect(multiply(P.number(3), P.array([]))[0])
			.toHaveProperty("type", "error");
	});
});
