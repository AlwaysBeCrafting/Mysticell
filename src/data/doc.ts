import { Id, Position } from './shared';

export interface IdMapped<T extends Id> {
	[id: number]: T;
}

export interface Sheet extends Id {
	title: string;
	// TODO: actual type
	cells: any[];
}

export interface Card extends Id {
	title: string;
	// TODO: actual type
	cells: any[];
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

export type SheetMap = IdMapped<Sheet>;
export type CardMap  = IdMapped<Card>;
export type FieldMap = IdMapped<Field>;
export type NodeMap  = IdMapped<Node>;

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