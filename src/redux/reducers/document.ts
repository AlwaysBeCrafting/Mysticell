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

const cellFromJson = ( json: docJson.CellJson ): CellState => ({
	...json,
});

const fieldFromJson = ( json: docJson.FieldJson ): FieldState => ({
	...json,
	children: ( json.children || [] ).map( child => child.id ),
	nodes: ( json.nodes || [] ).map( node => node.id ),
	expanded: false,
});

const nodeFromJson = ( json: docJson.NodeJson ): NodeState => ({
	...json,
	fxn: FxnLookup[ json.fxn ],
	inputValues: [],
	outputValue: "",
});


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
				cells: [ ...json.sheets, ...json.cards ]
					.reduce(( acc, sheetOrCard ) => [ ...acc, ...sheetOrCard.cells ], [] as docJson.CellJson[] )
					.reduce(( acc, cell ) => acc.set( cell.id, cellFromJson( cell )), new Map(),
				),

				fields: flatFields.reduce(
					( acc, field ) => acc.set( field.id, fieldFromJson( field )),
					new Map(),
				),

				nodes: flatFields
					.reduce(( acc, field ) => [ ...acc, ...( field.nodes || [] ) ], [] as docJson.NodeJson[] )
					.reduce(( acc, node ) => acc.set( node.id, nodeFromJson( node )), new Map() ),

				path: [],
				selectedNodes: [],
			};

		default: return state;
	}
};
