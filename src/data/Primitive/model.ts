import {Param, ParamFunction} from "data/common";
import {NodeFunction} from "data/Node";


interface Primitive extends NodeFunction {
	type: "primitive";
	eval: ParamFunction;
}


export {Primitive};
