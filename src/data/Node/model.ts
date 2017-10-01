import { Formula } from "data/Formula";
import { Primitive } from "data/Primitive";


interface Node {
	id: string;
	function: string;
	label: string;
	userValues: string[];
}

type NodeFunction = Formula | Primitive;


export { Node, NodeFunction };
