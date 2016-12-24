import { Position } from 'data/shared';

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
	isVisible: boolean;
}

export interface CardState extends Id {
	title: string;
	cells: Set<number>;
	isVisible: boolean;
}

export interface FieldState extends Id {
	name: string;
	parent?: number;
	children: number[];
	expanded: boolean;
}

export interface FormulaState extends Id {
	resultNode: number;
	nodes: number[];
}

export interface NodeState extends Id {
	label: string;
	fxn: string;
	inputNodes: number[];
	position: Position;
}

interface AppState {
	title: string;

	sheets: Map<number, SheetState>;
	cards: Map<number, CardState>;
	cells: Map<number, CellState>;

	fields: Map<number, FieldState>;
	formulas: Map<number, FormulaState>;
	nodes: Map<number, NodeState>;

	path: string[];
};

export default AppState;
