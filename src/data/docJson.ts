import { Id, Position } from './shared';

export interface CellJSON extends Id {
	field: number;
	position: Position;
	format: any;
}

export interface SheetJSON extends Id {
	title: string;
	cells: CellJSON[];
}

export interface CardJSON extends Id {
	title: string;
	cells: CellJSON[];
}

export interface NodeJSON extends Id {
	label: string;
	fxn: string;
	inputNodes: number[];
	position: Position;
}

export interface FormulaJSON {
	resultNode: number;
	nodes: NodeJSON[];
}

export interface FieldJSON extends Id {
	name: string;
	formula?: FormulaJSON;
	children: FieldJSON[];
}

export interface DocJSON extends Id {
	title: string;

	sheets: SheetJSON[];
	cards: CardJSON[];
	fields: FieldJSON[];
}

export default DocJSON;
