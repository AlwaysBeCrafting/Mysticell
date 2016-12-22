import Doc, { DocUi } from 'data/doc';

interface Id {
	id: number;
}

export interface CellState extends Id {
	field: number;
	position: Position;
	format: any;
}

export interface SheetState extends Id {
	title: string;
	cells: Set<number>;
}

export interface CardState extends Id {
	title: string;
	cells: Set<number>;
}

export interface FieldState extends Id {
	name: string;
	formula?: number;
	parent?: number;
	children: number[];
	expanded: boolean;
}

export interface FormulaState extends Id {
	resultNode: number;
	nodes: number[];
}

export interface NodeState  extends Id {
	label: string;
	fxn: string;
	inputNodes: number[];
	position: Position;
}

export interface DocState {
	title: string;

	sheets: Map<number, SheetState>;
	cards: Map<number, CardState>;
	fields: Map<number, FieldState>;
	nodes: Map<number, NodeState>;

	visibleCards: number[];
	visibleSheets: number[];
}

interface AppState {
	doc: DocState;
	path: string[];
};

export default AppState;
