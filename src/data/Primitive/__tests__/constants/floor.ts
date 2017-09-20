import {PARAMS as P} from "data/common";

import {constants} from "../../constants";


const floor = constants.floor.exec;

test("floor function returns exactly one value", () => {
	expect(floor(P.number(3)))
		.toHaveLength(1);
});

test("floor function returns an integer without change", () => {
	expect(floor(P.number(0)))
		.toEqual([P.number(0)]);
	expect(floor(P.number(3)))
		.toEqual([P.number(3)]);
});

test("floor function returns a decimal number rounded down", () => {
	expect(floor(P.number(3.2)))
		.toEqual([P.number(3)]);
});
