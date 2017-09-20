import {PARAMS as P} from "data/common";

import {constants} from "../../constants";


const subtract = constants.subtract.exec;

describe("subtract primitive", () => {
	it("returns exactly one value", () => {
		expect(subtract(P.number(3), P.number(2)))
			.toHaveLength(1);
	});

	it("returns the difference of two numbers", () => {
		expect(subtract(P.number(3), P.number(2)))
			.toEqual([P.number(1)]);
	});

	it("converts a numeric string to a number", () => {
		expect(subtract(P.number(3), P.string("2")))
			.toEqual(subtract(P.number(3), P.number(2)));
	});

	it("returns an error from a non-numeric string", () => {
		expect(subtract(P.number(3), P.string("A"))[0])
			.toHaveProperty("type", "error");
		expect(subtract(P.number(3), P.string("-"))[0])
			.toHaveProperty("type", "error");
	});

	it("treats empty parameters as 0", () => {
		expect(subtract(P.number(3), P.empty()))
			.toEqual(subtract(P.number(3), P.number(0)));
	});

	it("treats whitespace-only strings as empty", () => {
		expect(subtract(P.number(3), P.string("")))
			.toEqual(subtract(P.number(3), P.empty()));
		expect(subtract(P.number(3), P.string(" ")))
			.toEqual(subtract(P.number(3), P.empty()));
	});

	it("treats missing parameters as empty", () => {
		expect(subtract())
			.toEqual(subtract(P.empty(), P.empty()));
		expect(subtract(P.number(3)))
			.toEqual(subtract(P.number(3), P.empty()));
	});

	it("returns an error if given an array", () => {
		expect(subtract(P.number(3), P.array([]))[0])
			.toHaveProperty("type", "error");
	});
});
