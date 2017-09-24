import {Document} from "./model";


const enum ActionTypes {
	LOAD_DOCUMENT = "[Document] Load",
}
type Action = LoadDocumentAction;

interface LoadDocumentAction {
	readonly type: ActionTypes.LOAD_DOCUMENT;
	payload: {documentJson: Document};
}
const loadDocument = (documentJson: Document): LoadDocumentAction => ({
	type: ActionTypes.LOAD_DOCUMENT,
	payload: {documentJson},
});


export {loadDocument};
export {Action, ActionTypes};
