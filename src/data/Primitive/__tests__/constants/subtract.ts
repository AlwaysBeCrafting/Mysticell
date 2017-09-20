import {PARAMS as P} from "data/common";

import {constants} from "../../constants";


const subtract = constants.subtract.exec;

test("subtract function returns exactly one value", () => {
	expect(subtract(P.number(3), P.number(2)))
		.toHaveLength(1);
});

test("subtract function returns difference of two numbers", () => {
	expect(subtract(P.number(3), P.number(2)))
		.toEqual([P.number(1)]);
});

test("subtract function converts a numeric string to a number", () => {
	expect(subtract(P.number(3), P.string("2")))
		.toEqual(subtract(P.number(3), P.number(2)));
});

test("subtract function returns an error from a non-numeric string", () => {
	expect(subtract(P.number(3), P.string("A"))[0])
		.toHaveProperty("type", "error");
	expect(subtract(P.number(3), P.string("-"))[0])
		.toHaveProperty("type", "error");
});

test("subtract function treats empty as zero", () => {
	expect(subtract(P.number(3), P.empty()))
		.toEqual(subtract(P.number(3), P.number(0)));
});

test("subtract function treats whitespace-only string as empty", () => {
	expect(subtract(P.number(3), P.string("")))
		.toEqual(subtract(P.number(3), P.empty()));
	expect(subtract(P.number(3), P.string(" ")))
		.toEqual(subtract(P.number(3), P.empty()));
});

test("subtract function treats missing parameters as empty", () => {
	expect(subtract())
		.toEqual(subtract(P.empty(), P.empty()));
	expect(subtract(P.number(3)))
		.toEqual(subtract(P.number(3), P.empty()));
});

test("subtract function returns an error if given an array", () => {
	expect(subtract(P.number(3), P.array([]))[0])
		.toHaveProperty("type", "error");
});
