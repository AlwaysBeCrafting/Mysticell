import {Id, Position} from './shared';

export interface SheetJSON extends Id {
	title: string;
	// TODO: actual type
	cells: any[];
}

export interface CardJSON extends Id {
	title: string;
	// TODO: actual type
	cells: any[];
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
