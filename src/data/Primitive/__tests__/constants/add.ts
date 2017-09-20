import {PARAMS as P} from "data/common";

import {constants} from "../../constants";

const add = constants.add.exec;

test("add function returns exactly one value", () => {
	expect(add(P.number(3), P.number(2)))
		.toHaveLength(1);
});

test("add function returns sum of two numbers", () => {
	expect(add(P.number(3), P.number(2)))
		.toEqual([P.number(5)]);
});

test("add function converts a numeric string to a number", () => {
	expect(add(P.number(3), P.string("2")))
		.toEqual(add(P.number(3), P.number(2)));
});

test("add function returns an error from a non-numeric string", () => {
	expect(add(P.number(3), P.string("A"))[0])
		.toHaveProperty("type", "error");
	expect(add(P.number(3), P.string("-"))[0])
		.toHaveProperty("type", "error");
});

test("add function treats empty as identity", () => {
	expect(add(P.number(3), P.empty()))
		.toEqual(add(P.number(3), P.number(0)));
});

test("add function treats whitespace-only string as empty", () => {
	expect(add(P.number(3), P.string("")))
		.toEqual(add(P.number(3), P.empty()));
	expect(add(P.number(3), P.string(" ")))
		.toEqual(add(P.number(3), P.empty()));
});

test("add function treats missing parameters as empty", () => {
	expect(add())
		.toEqual(add(P.empty(), P.empty()));
	expect(add(P.number(3)))
		.toEqual(add(P.number(3), P.empty()));
});

test("add function returns an error if given an array", () => {
	expect(add(P.number(3), P.array([]))[0])
		.toHaveProperty("type", "error");
});
