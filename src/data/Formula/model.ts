import {Dict} from "common/types";

import {FormulaGraph} from "data/common";
import {NodeFunction} from "data/Node/model";


interface Formula extends NodeFunction {
	type: "formula";
	isProperty: boolean;
	graph: FormulaGraph;
	layout: Dict<[number, number]>;
}


export {Formula};
