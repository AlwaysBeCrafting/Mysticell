import { clientRequest } from "data/client";
import { TypedAction } from "data/common";

import { Document } from "./model";

const enum ActionTypes {
  CREATE = "[Document] Create",

  INDEX = "[Document] Index",
}
type Action = CreateAction | IndexAction;

interface CreateAction extends TypedAction<ActionTypes.CREATE> {
  payload: { document: Document };
}
const createDocument = (document: Document): Action => ({
  type: ActionTypes.CREATE,
  payload: { document },
});

interface IndexAction extends TypedAction<ActionTypes.INDEX> {}
const indexDocuments = (): Action =>
  clientRequest(ActionTypes.INDEX, "GET", "documents");

export { Action, ActionTypes };
export { createDocument, indexDocuments };
