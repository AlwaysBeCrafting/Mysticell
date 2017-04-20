import { DocumentJson } from './model';


export namespace ActionTypes {
	export const LOAD_DOCUMENT = '[Document] Load';
}


interface LoadDocumentAction {
	readonly type: typeof ActionTypes.LOAD_DOCUMENT;
	payload: { documentJson: DocumentJson };
}

const loadDocument = ( documentJson: DocumentJson ): LoadDocumentAction => ({
	type: ActionTypes.LOAD_DOCUMENT,
	payload: { documentJson },
});


type Action = LoadDocumentAction;


export { loadDocument };

export { Action };
export default Action;
