import { combineReducers } from "redux";

import { Cell, Field, Grid, Node } from "data";

import * as document from "redux/actions/document";
import { CellState, reducer as reduceCells } from "redux/reducers/document/cells";
import { FieldState, reducer as reduceFields } from "redux/reducers/document/fields";
import { GridState, reducer as reduceGrids } from "redux/reducers/document/grids";
import { NodeState, reducer as reduceNodes } from "redux/reducers/document/nodes";
import { reducer as reduceTitle } from "redux/reducers/document/title";

import * as docJson from "data/docJson";
import FxnLookup from "data/fxn";

export interface DocumentState {
	title: string;

	cells: CellState;
	fields: FieldState;
	grids: GridState;
	nodes: NodeState;
}

const flattenFields = ( fields: docJson.FieldJson[] ): docJson.FieldJson[] => fields.reduce(
	( acc, field ) => [ ...acc, field, ...flattenFields( field.children )],
	[] as docJson.FieldJson[],
);

const gridFromJson = ( json: docJson.GridJson ): Grid => ({
	...json,
	cells: new Set( json.cells.map( cell => cell.id )),
	isVisible: true,
});

const cellsFromGridJson = ( json: docJson.GridJson ): Cell[] => {
	return ( json.cells || [] ).map( cell => ({
		...cell,
		grid: json.id,
	}));
};

const fieldFromJson = ( json: docJson.FieldJson ): Field => ({
	...json,
	children: ( json.children || [] ).map( child => child.id ),
	expanded: false,
});

const nodesFromFieldJson = ( json: docJson.FieldJson ): Node[] => {
	return ( json.nodes || [] ).map( node => ({
		...node,
		field: json.id,
		fxn: FxnLookup[ node.fxn ],
		inputValues: [],
		outputValue: "",
	}));
};

export const reduceLoadDocument = ( state: DocumentState, action: document.Actions ): DocumentState => {
	switch ( action.type ) {
		case document.ActionTypes.LOAD_DOCUMENT:
			const json = action.payload.docJson;

			const flatFields = flattenFields( json.fields );

			return {
				...state,

				title: json.title,

				grids: {
					...state.grids,
					grids: json.grids.reduce(
						( acc, sheet ) => acc.set( sheet.id, gridFromJson( sheet )),
						new Map(),
					),
				},
				cells: {
					...state.cells,
					cells: json.grids.reduce(
						( acc, grid ) => {
							cellsFromGridJson( grid ).forEach( cell => acc.set( cell.id, cell ));
							return acc;
						}, new Map(),
					),
				},

				fields: {
					...state.fields,
					fields: flatFields.reduce(
						( acc, field ) => acc.set( field.id, fieldFromJson( field )),
						new Map(),
					),
				},

				nodes: {
					...state.nodes,
					nodes: flatFields.reduce(
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
		title: reduceTitle,

		cells: reduceCells,
		fields: reduceFields,
		grids: reduceGrids,
		nodes: reduceNodes,
	}),
];

export const reducer = ( state: DocumentState, action: document.Actions ) => reducerChain.reduce(
	( chainedState, chainedReducer ) => chainedReducer( chainedState, action ),
	state,
);
