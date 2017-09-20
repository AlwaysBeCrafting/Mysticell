import {PARAMS} from "data/common";

import exampleDoc from "common/assets/exampleDoc.json";

import {execFormula} from "../graph";


test("ability score of 10 has modifier 0", () => {
	const result = execFormula(exampleDoc, "FORMULA-0000", PARAMS.number(10))[0];
	expect(result).toHaveProperty("type", "number");
	expect(result).toHaveProperty("value", 0);
});

test("ability score of 15 has modifier 2", () => {
	const result = execFormula(exampleDoc, "FORMULA-0000", PARAMS.number(15))[0];
	expect(result).toHaveProperty("type", "number");
	expect(result).toHaveProperty("value", 2);
});
