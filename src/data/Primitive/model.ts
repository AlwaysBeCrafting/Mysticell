import {Param} from "data/common";
import {NodeFunction} from "data/Node/model";


interface Primitive extends NodeFunction {
	type: "primitive";
	eval: (...params: Param[]) => Param[];
}


export {Primitive};
