import {ParamFunction} from "data/common";


interface Primitive {
	id: string;
	name: string;
	inputNames: string[];
	outputNames: string[];
	exec: ParamFunction;
}


export {Primitive};
