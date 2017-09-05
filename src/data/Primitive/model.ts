import {ParamFunction} from "data/common";
import {NodeFunction} from "data/Node";


interface Primitive extends NodeFunction {
	type: "primitive";
	exec: ParamFunction;
}


export {Primitive};
