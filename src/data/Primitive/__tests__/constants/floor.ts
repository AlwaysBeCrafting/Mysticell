import {PARAMS as P} from "data/common";

import {constants} from "../../constants";


const floor = constants.floor.exec;

describe("floor primitive", () => {
	it("returns exactly one value", () => {
		expect(floor(P.number(3)))
			.toHaveLength(1);
	});

	it("returns an integer without change", () => {
		expect(floor(P.number(0)))
			.toEqual([P.number(0)]);
		expect(floor(P.number(3)))
			.toEqual([P.number(3)]);
	});

	it("returns a decimal number rounded down", () => {
		expect(floor(P.number(3.2)))
			.toEqual([P.number(3)]);
	});

	it("treats empty parameters as 0", () => {
		expect(floor(P.empty()))
			.toEqual(floor(P.number(0)));
	});

	it("returns an error if given an array", () => {
		expect(floor(P.array([]))[0])
			.toHaveProperty("type", "error");
	});
});
