import { Position } from "common/types/layout";


export interface Field {
	id: number;
	name: string;
	children: Field[];
	resultNode: number;
	nodes: Node[];
}

export interface Node {
	id: number;
	label: string;
	fxn: string;
	inputNodes: number[];
	position: Position;
}

export interface Sheet {
	id: number;
	title: string;
	cells: Cell[];
	width: number;
	height: number;
}

export interface Cell {
	id: number;
	field: number;
	start: Position;
	end: Position;
}

export interface Document {
	id: number;
	title: string;
	sheets: Sheet[];
	fields: Field[];
}
