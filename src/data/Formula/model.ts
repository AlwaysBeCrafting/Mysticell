import {Dict} from "common/types";

import {FormulaGraph} from "data/common";


interface Formula {
	id: string;
	name: string;
	inputNames: string[];
	outputNames: string[];
	isProperty: boolean;
	graph: FormulaGraph;
	layout: Dict<[number, number]>;
}


export {Formula};
