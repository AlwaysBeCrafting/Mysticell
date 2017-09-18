import {PARAMS} from "data/common";

import exampleDoc from "common/assets/exampleDoc.json";

import {execFormula} from "../graph";


test("graph ", () => {
	const result = execFormula(exampleDoc)("FORMULA-0000")(PARAMS.number(10))[0];
	expect(result.type).toBe("number");
	expect(result.value).toBe(0);
});
