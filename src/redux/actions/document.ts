import { DocJson } from "data/docJson";

export class ActionTypes {
	static readonly LOAD_DOCUMENT = "[Document] Load";
}

export class LoadDocumentAction {
	type = ActionTypes.LOAD_DOCUMENT;
	payload: { docJson: DocJson };
}
export const loadDocument = ( docJson: DocJson ): LoadDocumentAction => ({
	type: ActionTypes.LOAD_DOCUMENT,
	payload: { docJson },
});

export type Actions = LoadDocumentAction;
