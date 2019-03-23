import { clientRequest } from "data/client";
import { TypedAction } from "data/common";

import { Document } from "./model";

const enum ActionTypes {
  CREATE = "[Document] Create",

  LIST = "[Document] List",
}
type Action = CreateAction | ListAction;

interface CreateAction extends TypedAction<ActionTypes.CREATE> {
  payload: { document: Document };
}
const createDocument = (document: Document): Action => ({
  type: ActionTypes.CREATE,
  payload: { document },
});

interface ListAction extends TypedAction<ActionTypes.LIST> {}
const listDocuments = (): Action =>
  clientRequest(ActionTypes.LIST, "GET", "documents");

export { Action, ActionTypes };
export { createDocument, listDocuments };
