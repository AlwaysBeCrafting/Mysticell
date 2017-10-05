import { PARAMS } from "data/common";
import { Document } from "data/Document";

import { resolveProperty } from "../graph";


const testDoc: Document = {
	id: "DOCUMENT-test",
	title: "Test Document",
	cells: {},
	sheets: {},
	nodes: {
		"NODE-addA": {
			id: "NODE-addA",
			function: "PRIMITIVE-add",
			label: "Adding node A",
			userValues: ["0", "0"],
		},
		"NODE-addB": {
			id: "NODE-addB",
			function: "PRIMITIVE-add",
			label: "Adding node B",
			userValues: ["0", "0"],
		},
		"NODE-includeA": {
			id: "NODE-includeA",
			function: "FORMULA-addTwice",
			label: "Add twice",
			userValues: ["2", "5"],
		},
		"NODE-cycleA": {
			id: "NODE-cycleA",
			function: "PRIMITIVE-add",
			label: "Cycling node A",
			userValues: ["0", "0"],
		},
		"NODE-cycleB": {
			id: "NODE-cycleB",
			function: "PRIMITIVE-add",
			label: "Cycling node B",
			userValues: ["0", "0"],
		},
	},
	formulas: {
		"FORMULA-addTwice": {
			id: "FORMULA-addTwice",
			name: "Formula Adding Twice",
			inputNames: ["Input number A", "Input number B"],
			outputNames: ["Output number A", "Output number B"],
			isProperty: true,
			graph: [
				{ source: "input", target: "NODE-addA", data: [0, 0] },
				{ source: "input", target: "NODE-addA", data: [1, 1] },
				{ source: "input", target: "NODE-addB", data: [0, 0] },
				{ source: "input", target: "NODE-addB", data: [1, 1] },
				{ source: "NODE-addA", target: "output", data: [0, 0] },
				{ source: "NODE-addB", target: "output", data: [0, 1] },
			],
			layout: {},
		},
		"FORMULA-include": {
			id: "FORMULA-include",
			name: "Formula Including Another",
			inputNames: ["Input number A", "Input number B"],
			outputNames: ["Output number A", "Output number B"],
			isProperty: true,
			graph: [
				{ source: "input", target: "NODE-includeA", data: [0, 0] },
				{ source: "input", target: "NODE-includeA", data: [1, 1] },
				{ source: "NODE-includeA", target: "output", data: [0, 0] },
				{ source: "NODE-includeA", target: "output", data: [1, 1] },
			],
			layout: {},
		},
		"FORMULA-cyclic": {
			id: "FORMULA-cyclic",
			name: "Cyclic Formula",
			inputNames: ["Input number"],
			outputNames: ["Output error", "Output another error"],
			isProperty: true,
			graph: [
				{ source: "input", target: "NODE-cycleA", data: [0, 0] },
				{ source: "input", target: "NODE-cycleB", data: [0, 0] },
				{ source: "NODE-cycleA", target: "NODE-cycleB", data: [0, 1] },
				{ source: "NODE-cycleB", target: "NODE-cycleA", data: [0, 1] },
				{ source: "NODE-cycleB", target: "output", data: [0, 0] },
			],
			layout: {},
		},
	},
	nav: { value: "root" },
	propertyInputs: {
		"FORMULA-addTwice": ["2", "5"],
		"FORMULA-include": ["2", "5"],
		"FORMULA-cyclic": ["10"],
	},
};

describe("graph resolver", () => {
	it("resolves a correct graph with only primitives", async () => {
		const result = await resolveProperty(testDoc, "FORMULA-addTwice");
		expect(result)
			.toHaveLength(testDoc.formulas["FORMULA-addTwice"].outputNames.length);
		expect(result)
			.toEqual([PARAMS.number(7), PARAMS.number(7)]);
	});
	it("resolves a correct graph that includes another one", async () => {
		const result = await resolveProperty(testDoc, "FORMULA-include");
		expect(result)
			.toHaveLength(testDoc.formulas["FORMULA-include"].outputNames.length);
		expect(result)
			.toEqual([PARAMS.number(7), PARAMS.number(7)]);
	});
	it("returns an error when its contents loop", async () => {
		const result = await resolveProperty(testDoc, "FORMULA-cyclic");
		expect(result)
			.toHaveLength(testDoc.formulas["FORMULA-cyclic"].outputNames.length);
		expect(result[0])
			.toHaveProperty("type", "error");
	});
});
