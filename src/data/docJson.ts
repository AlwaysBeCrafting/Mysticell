import { Position } from "data/shared";

export interface FieldJson {
	id: number;
	name: string;
	children: FieldJson[];
	resultNode: number;
	nodes: NodeJson[];
}

export interface NodeJson {
	id: number;
	label: string;
	fxn: string;
	inputNodes: number[];
	position: Position;
}

//------------------------------------------------------------------------------

export interface GridJson {
	type: "card" | "page";
	id: number;
	title: string;
	cells: CellJson[];
}

export interface CellJson {
	id: number;
	field: number;
	start: Position;
	end: Position;
}

//------------------------------------------------------------------------------

export interface DocJson {
	id: number;
	title: string;
	grids: GridJson[];
	fields: FieldJson[];
}
