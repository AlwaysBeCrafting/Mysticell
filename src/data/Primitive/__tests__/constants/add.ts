import {PARAMS as P } from "data/common";

import { constants } from "../../constants";


const add = constants.add.exec;

describe("add function", () => {
	it("returns exactly one value", () => {
		expect(add(P.number(3), P.number(2)))
			.toHaveLength(1);
	});

	it("returns the sum of two numbers", () => {
		expect(add(P.number(3), P.number(2)))
			.toEqual([P.number(5)]);
	});

	it("converts a numeric string to a number", () => {
		expect(add(P.number(3), P.string("2")))
			.toEqual(add(P.number(3), P.number(2)));
	});

	it("returns an error from a non-numeric string", () => {
		expect(add(P.number(3), P.string("A"))[0])
			.toHaveProperty("type", "error");
		expect(add(P.number(3), P.string("-"))[0])
			.toHaveProperty("type", "error");
	});

	it("treats empty parameters as 0", () => {
		expect(add(P.number(3), P.empty()))
			.toEqual(add(P.number(3), P.number(0)));
	});

	it("treats whitespace-only strings as empty", () => {
		expect(add(P.number(3), P.string("")))
			.toEqual(add(P.number(3), P.empty()));
		expect(add(P.number(3), P.string(" ")))
			.toEqual(add(P.number(3), P.empty()));
	});

	it("treats missing parameters as empty", () => {
		expect(add())
			.toEqual(add(P.empty(), P.empty()));
		expect(add(P.number(3)))
			.toEqual(add(P.number(3), P.empty()));
	});

	it("returns an error if given an array", () => {
		expect(add(P.number(3), P.array([]))[0])
			.toHaveProperty("type", "error");
	});
});
