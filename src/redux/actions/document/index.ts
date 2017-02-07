import { DocJson } from "data/docJson";

export class ActionTypes {
	static readonly LOAD_DOCUMENT = "[Document] Load";
}

export class LoadDocumentAction {
	readonly type = ActionTypes.LOAD_DOCUMENT;
	constructor ( public payload: { docJson: DocJson }) {};
}
export const loadDocument = ( docJson: DocJson ): LoadDocumentAction => ({
	...new LoadDocumentAction({ docJson }),
});

export type Actions = LoadDocumentAction;
