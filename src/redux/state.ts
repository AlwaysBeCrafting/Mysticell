import { Fxn } from "data/fxn";
import { Anchor, Position } from "data/shared";

export interface Id {
	id: number;
}

export interface CellState extends Id {
	grid: number;
	field: number;
	start: Position;
	end: Position;
	format?: any;
}

export interface GridState extends Id {
	title: string;
	isVisible: boolean;
	type: "card" | "page";
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
	inputNodes: Array<number|undefined>;
	position: Position;
	inputValues: Array<string|number|undefined>;
	outputValue: string|number;
}

export interface PopupState {
	element?: JSX.Element;
	position: Position;
	anchor?: Anchor;
}

export interface AppState {
	title: string;

	grids: Map<number, GridState>;
	cells: Map<number, CellState>;

	fields: Map<number, FieldState>;
	nodes: Map<number, NodeState>;

	selectedNodes: number[];

	path: string[];
	popup: PopupState;
};
