import { Fxn } from "common/types/fxn";
import { Id } from "common/types/id";
import { Position } from "common/types/layout";

import { Cell } from "./cells";
import { Graph, Node } from "./nodes";


export { Cell, Graph, Node };


export interface Sheet extends Id {
	title: string;
	width: number;
	height: number;
}


export interface Document extends Id {
	title: string;

	cells: Map<number, Cell>;
	graph: Graph;
}
