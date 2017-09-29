import { TypedAction } from "data/common";

import { Document } from "./model";


const enum ActionTypes {
	LOAD_DOCUMENT = "[Document] Load",
}
type Action = LoadDocumentAction;

interface LoadDocumentAction extends TypedAction<ActionTypes.LOAD_DOCUMENT> {
	payload: {documentJson: Document};
}
const loadDocument = (documentJson: Document): Action => ({
	type: ActionTypes.LOAD_DOCUMENT,
	payload: {documentJson},
});


export {Action, ActionTypes};
export {loadDocument};
