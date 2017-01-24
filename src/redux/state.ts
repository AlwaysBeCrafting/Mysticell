import { Fxn } from "data/fxn";
import { Anchor, Position } from "data/shared";

export interface Id {
	id: number;
}

export interface CellState extends Id {
	field: number;
	start: Position;
	end: Position;
	format?: any;
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
	resultNode: number;
}

export interface NodeState extends Id {
	field: number;
	label: string;
	fxn: Fxn;
	inputNodes: number[];
	position: Position;
	inputValues: Array<string|number>;
	outputValue: string|number;
}

export interface PopupState {
	element?: JSX.Element;
	position: Position;
	anchor?: Anchor;
}

export interface AppState {
	title: string;

	sheets: Map<number, SheetState>;
	cards: Map<number, CardState>;
	cells: Map<number, CellState>;

	fields: Map<number, FieldState>;
	nodes: Map<number, NodeState>;

	selectedNodes: number[];

	path: string[];
	popup: PopupState;
};
