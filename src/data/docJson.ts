import Position from 'data/shared';

interface FieldJson {
	id: number;
	name: string;
	formula?: FormulaJson;
	children: FieldJson[];
}

interface FormulaJson {
	resultNode: number;
	nodes: NodeJson[];
}

interface NodeJson {
	id: number;
	label: string;
	fxn: string;
	inputNodes: number[];
	position: Position;
}

//------------------------------------------------------------------------------

interface SheetJson {
	id: number;
	title: string;
	cells: CellJson[];
}

interface CardJson {
	id: number;
	title: string;
	cells: CellJson[];
}

interface CellJson {
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
