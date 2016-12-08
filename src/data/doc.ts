import { Id, Position } from './shared';

export interface IdMap<T extends Id> {
	[id: number]: T;
}

export interface Cell extends Id {
	field: number;
	position: Position;
	format: any;
}

export interface Sheet extends Id {
	title: string;
	cells: Cell[];
}

export interface Card extends Id {
	title: string;
	cells: Cell[];
}

export interface Node extends Id {
	label: string;
	fxn: string;
	inputNodes: number[];
	position: Position;
}

export interface Formula {
	resultNode: number;
	nodes: number[];
}

export interface Field extends Id {
	name: string;
	formula?: Formula;
	children: number[];
}

export type SheetMap = IdMap<Sheet>;
export type CardMap  = IdMap<Card>;
export type FieldMap = IdMap<Field>;
export type NodeMap  = IdMap<Node>;

export interface Doc extends Id {
	title: string;

	sheets: SheetMap;
	cards: CardMap;
	fields: FieldMap;
	nodes: NodeMap;

	rootFields: number[];
	visibleCards: number[];
	visibleSheets: number[];
}

export default Doc;
