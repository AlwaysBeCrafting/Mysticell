import * as document from "redux/actions/document";
import { AppState, CardState, CellState, FieldState, Id, NodeState, SheetState } from "redux/state";

import * as docJson from "data/docJson";
import FxnLookup from "data/fxn";


const flattenFields = ( fields: docJson.FieldJson[] ): docJson.FieldJson[] => fields.reduce(
	( acc, field ) => [ ...acc, field, ...flattenFields( field.children )],
	[] as docJson.FieldJson[],
);

const sheetFromJson = ( json: docJson.SheetJson ): SheetState => ({
	...json,
	cells: new Set( json.cells.map( cell => cell.id )),
	isVisible: true,
});

const cardFromJson = ( json: docJson.CardJson ): CardState => ({
	...json,
	cells: new Set( json.cells.map( cell => cell.id )),
	isVisible: true,
});

const cellsFromSheetJson = ( json: docJson.CardJson | docJson.SheetJson ): CellState[] => {
	return ( json.cells || [] ).map( cell => ({
		...cell,
		sheet: json.id,
	}));
};

const fieldFromJson = ( json: docJson.FieldJson ): FieldState => ({
	...json,
	children: ( json.children || [] ).map( child => child.id ),
	expanded: false,
});

const nodesFromFieldJson = ( json: docJson.FieldJson ): NodeState[] => {
	return ( json.nodes || [] ).map( node => ({
		...node,
		field: json.id,
		fxn: FxnLookup[ node.fxn ],
		inputValues: [],
		outputValue: "",
	}));
};


export const reducer = ( state: AppState, action: document.Actions ): AppState => {
	switch ( action.type ) {
		case document.ActionTypes.LOAD_DOCUMENT:
			const json = action.payload.docJson;

			const flatFields = flattenFields( json.fields );

			return {
				...state,

				title: json.title,

				sheets: json.sheets.reduce(
					( acc, sheet ) => acc.set( sheet.id, sheetFromJson( sheet )),
					new Map(),
				),
				cards: json.cards.reduce(
					( acc, card ) => acc.set( card.id, cardFromJson( card )),
					new Map(),
				),
				cells: [ ...json.sheets, ...json.cards ].reduce(
					( acc, sheetOrCard ) => {
						cellsFromSheetJson( sheetOrCard ).forEach( cell => acc.set( cell.id, cell ));
						return acc;
					}, new Map() ),

				fields: flatFields.reduce(
					( acc, field ) => acc.set( field.id, fieldFromJson( field )),
					new Map(),
				),

				nodes: flatFields.reduce(
					( acc, field ) => {
						nodesFromFieldJson( field ).forEach( node => acc.set( node.id, node ));
						return acc;
					}, new Map() ),

				path: [],
				selectedNodes: [],
			};

		default: return state;
	}
};
