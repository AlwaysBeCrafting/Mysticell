import Position from 'data/shared';

export interface FieldJson {
	id: number;
	name: string;
	formula?: FormulaJson;
	children: FieldJson[];
}

export interface FormulaJson {
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

export interface SheetJson {
	id: number;
	title: string;
	cells: CellJson[];
}

export interface CardJson {
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

interface DocJson {
	id: number;
	title: string;
	sheets: SheetJson[];
	cards: CardJson[];
	fields: FieldJson[];
}

export default DocJson;
