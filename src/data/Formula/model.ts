import {Dict} from "common/types";

import {NodeFunction} from "data/Node/model";


interface Formula extends NodeFunction {
	type: "formula";
	isProperty: boolean;
	graph: Dict<Dict<Array<[number, number]>>>;
	layout: Dict<[number, number]>;
}


export {Formula};
