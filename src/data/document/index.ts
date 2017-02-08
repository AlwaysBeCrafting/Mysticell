import { combineReducers } from "redux";

import { Cell, Field, Node, Sheet } from "common/types";
import FxnLookup from "common/types/fxn";
import Json from "common/types/json";

import cells,  { Action as CellAction,  CellState  } from "./cells";
import fields, { Action as FieldAction, FieldState } from "./fields";
import nodes,  { Action as NodeAction,  NodeState  } from "./nodes";
import sheets, { Action as SheetAction, SheetState } from "./sheets";
import title,  { Action as TitleAction             } from "./title";


export interface DocumentState {
	title: string;

	cells: CellState;
	fields: FieldState;
	sheets: SheetState;
	nodes: NodeState;
}


class ActionTypes {
	static readonly LOAD_DOCUMENT = "[Document] Load";
}


class LoadDocumentAction {
	readonly type = ActionTypes.LOAD_DOCUMENT;
	constructor ( public payload: { document: Json.Document }) {};
}
export const loadDocument = ( document: Json.Document ): LoadDocumentAction => ({
	...new LoadDocumentAction({ document }),
});


export type Action =
	LoadDocumentAction |
	CellAction         |
	FieldAction        |
	NodeAction         |
	SheetAction        |
	TitleAction;


const flattenFields = ( fields: Json.Field[] ): Json.Field[] => fields.reduce(
	( acc, field ) => [ ...acc, field, ...flattenFields( field.children )],
	[] as Json.Field[],
);

const gridFromJson = ( json: Json.Sheet ): Sheet => ({
	...json,
	cells: new Set( json.cells.map( cell => cell.id )),
	isVisible: true,
});

const cellsFromGridJson = ( json: Json.Sheet ): Cell[] => {
	return ( json.cells || [] ).map( cell => ({
		...cell,
		sheet: json.id,
	}));
};

const fieldFromJson = ( json: Json.Field ): Field => ({
	...json,
	children: ( json.children || [] ).map( child => child.id ),
	expanded: false,
});

const nodesFromFieldJson = ( json: Json.Field ): Node[] => {
	return ( json.nodes || [] ).map( node => ({
		...node,
		field: json.id,
		fxn: FxnLookup[ node.fxn ],
		inputValues: [],
		outputValue: "",
	}));
};

export const reduceLoadDocument = ( state: DocumentState, action: Action ): DocumentState => {
	switch ( action.type ) {
		case ActionTypes.LOAD_DOCUMENT:
			const document = action.payload.document;

			const flatFields = flattenFields( document.fields );

			return {
				...state,

				title: document.title,

				sheets: {
					...state.sheets,
					collection: document.sheets.reduce(
						( acc, sheet ) => acc.set( sheet.id, gridFromJson( sheet )),
						new Map(),
					),
				},
				cells: {
					...state.cells,
					collection: document.sheets.reduce(
						( acc, grid ) => {
							cellsFromGridJson( grid ).forEach( cell => acc.set( cell.id, cell ));
							return acc;
						}, new Map(),
					),
				},

				fields: {
					...state.fields,
					collection: flatFields.reduce(
						( acc, field ) => acc.set( field.id, fieldFromJson( field )),
						new Map(),
					),
				},

				nodes: {
					...state.nodes,
					collection: flatFields.reduce(
						( acc, field ) => {
							nodesFromFieldJson( field ).forEach( node => acc.set( node.id, node ));
							return acc;
						}, new Map(),
					),
					selection: [],
				},
			};

		default: return state;
	}
};

const reducerChain: Array<( DocumentState, Action ) => DocumentState> = [
	reduceLoadDocument,
	combineReducers<DocumentState>({
		title,

		cells,
		fields,
		sheets,
		nodes,
	}),
];

export default ( state: DocumentState, action: Action ) => reducerChain.reduce(
	( chainedState, chainedReducer ) => chainedReducer( chainedState, action ),
	state,
);
