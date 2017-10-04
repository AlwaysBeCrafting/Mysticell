import { PARAMS } from "data/common";
import { Document } from "data/Document";

import { resolveProperty } from "../graph";


const testDoc: Document = {
	id: "DOCUMENT-test",
	title: "Test Document",
	cells: {},
	sheets: {},
	nodes: {
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
		"FORMULA-cyclic": ["10"],
	},
};

describe("graph resolver", () => {
	it("returns an error when its contents loop", async () => {
		const result = await resolveProperty(testDoc, "FORMULA-cyclic");
		expect(result)
			.toHaveLength(testDoc.formulas["FORMULA-cyclic"].outputNames.length);
		expect(result[0])
			.toHaveProperty("type", "error");
	});
});
