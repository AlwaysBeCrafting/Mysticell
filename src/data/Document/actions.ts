import { TypedAction } from "data/common";

const enum ActionTypes {
  LOAD_DOCUMENT = "[Document] Load",
}
type Action = LoadDocumentAction;

interface LoadDocumentAction extends TypedAction<ActionTypes.LOAD_DOCUMENT> {
  payload: { documentJson: any };
}
const loadDocument = (documentJson: any): Action => ({
  type: ActionTypes.LOAD_DOCUMENT,
  payload: { documentJson },
});

export { Action, ActionTypes };
export { loadDocument };
