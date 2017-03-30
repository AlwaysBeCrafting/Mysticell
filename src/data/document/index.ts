import { combineReducers } from "redux";

import { Cell, Sheet } from "common/types/document";
import { Graph, Node } from "common/types/document/nodes";
import FxnLookup from "common/types/fxn";

import graph,  { Action as NodeAction  } from "./graph";
import sheets, { Action as SheetAction } from "./sheets";
import title,  { Action as TitleAction } from "./title";


class ActionTypes {
	static readonly LOAD_DOCUMENT = "[Document] Load";
}


class LoadDocumentAction {
	readonly type = ActionTypes.LOAD_DOCUMENT;
	constructor ( public payload: { document: Document }) {};
}
export const loadDocument = ( document: Document ): LoadDocumentAction => ({
	...new LoadDocumentAction({ document }),
});


export type Action =
	LoadDocumentAction |
	NodeAction         |
	SheetAction        |
	TitleAction;

export const reduceLoadDocument = ( state: Document, action: Action ): Document => {
	switch ( action.type ) {
		case ActionTypes.LOAD_DOCUMENT:
			return action.payload.document;

		default: return state;
	}
};

const reducerChain: Array<( Document, Action ) => Document> = [
	reduceLoadDocument,
	combineReducers<Document>({
		title,

		sheets,
		graph,
	}),
];

export default ( state: Document, action: Action ) => reducerChain.reduce(
	( chainedState, chainedReducer ) => chainedReducer( chainedState, action ),
	state,
);
