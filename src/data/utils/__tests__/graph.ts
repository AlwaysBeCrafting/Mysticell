import {PARAMS} from "data/common";
import {Document} from "data/Document";

import {execFormula} from "../graph";


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
			outputNames: ["Output error"],
			isProperty: false,
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
	nav: [],
};

describe("graph resolver", () => {
	it("returns an error when its contents loop", () => {
		const result = execFormula(testDoc, "FORMULA-cyclic", PARAMS.number(10));
		expect(result)
			.toHaveLength(testDoc.formulas["FORMULA-cyclic"].outputNames.length);
		expect(result[0])
			.toHaveProperty("type", "error");
	});
});
