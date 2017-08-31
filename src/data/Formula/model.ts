import {ObjMap} from "common/types";

import {NodeFunction} from "data/Node/model";


interface Formula extends NodeFunction {
	type: "formula";
	isProperty: boolean;
	graph: ObjMap<ObjMap<Array<[number, number]>>>;
	layout: ObjMap<[number, number]>;
}


export {Formula};
