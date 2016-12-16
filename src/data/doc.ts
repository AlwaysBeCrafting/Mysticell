import * as JSON from './docJson';
import flatten from './flatten';
import { Id, Parent, Position } from './shared';

//==============================================================================

export interface Cell extends Id {
	field: number;
	position: Position;
	format: any;
}
const cellFromJSON = ( json: JSON.CellJSON ): Cell => json;

//------------------------------------------------------------------------------

export interface Sheet extends Id {
	title: string;
	cells: Cell[];
}
const sheetFromJSON = ( json: JSON.SheetJSON ): Sheet => ({
	...json,
	cells: json.cells.map( cell => cellFromJSON( cell )),
});

//------------------------------------------------------------------------------

export interface Card extends Id {
	title: string;
	cells: Cell[];
}
const cardFromJSON = ( json: JSON.CardJSON ): Card => ({
	...json,
	cells: json.cells.map( cell => cellFromJSON( cell )),
});

//------------------------------------------------------------------------------

export interface Node extends Id {
	label: string;
	fxn: string;
	inputNodes: number[];
	position: Position;
}
const nodeFromJSON = ( json: JSON.NodeJSON ): Node => json;

//------------------------------------------------------------------------------

export interface Formula {
	resultNode: number;
	nodes: number[];
}
const formulaFromJSON = ( json?: JSON.FormulaJSON ): Formula => ({
	...json,
	nodes: ( json && json.nodes.map( node => node.id )) || [],
});

//------------------------------------------------------------------------------

export interface Field extends Id, Parent<number> {
	name: string;
	formula?: Formula;
	children: number[];
}
const fieldFromJSON = ( json: JSON.FieldJSON ): Field => ({
	...json,
	formula: formulaFromJSON( json.formula ),
	children: json.children.map( child => child.id ),
});

//------------------------------------------------------------------------------

export type SheetMap = Map<number, Sheet>;
export type CardMap  = Map<number, Card>;
export type FieldMap = Map<number, Field>;
export type NodeMap  = Map<number, Node>;

export interface Doc extends Id {
	title: string;

	sheets: SheetMap;
	cards: CardMap;
	fields: FieldMap;
	nodes: NodeMap;

	rootFields: number[];
	visibleCards: number[];
	visibleSheets: number[];

	ui: DocUI;
};

export interface DocUI {
	expandedFields: Set<number>;
}

export const docFromJSON = ( json: JSON.DocJSON ): Doc => {
	const flatFields = flatten( json.fields );

	// Nodes are children of formulas are children of fields, they need to be
	// extracted to their own list for id-reference
	const nodes = flatFields.reduce(( acc, field ) => [
		...acc,
		...( field.formula && field.formula.nodes ) || [],
	], [] as JSON.NodeJSON[] );

	const mapId = <T extends Id>(values: T[]): Map<number, T> => {
		return new Map( values.map(( value ): [number, T] => [value.id, value]));
	};

	return {
		...json,

		sheets: mapId( json.sheets.map( sheet => sheetFromJSON( sheet ))),
		cards:  mapId( json.cards.map(  card  => cardFromJSON(  card  ))),
		fields: mapId( flatFields.map(  field => fieldFromJSON( field ))),
		nodes:  mapId( nodes.map(       node  => nodeFromJSON(  node  ))),

		rootFields:    json.fields.map( field => field.id ),
		visibleCards:  json.cards.map(  card  => card.id  ),
		visibleSheets: json.sheets.map( sheet => sheet.id ),

		ui: {} as DocUI,
	};
};

export default Doc;
