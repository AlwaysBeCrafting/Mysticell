import { clientRequest } from "data/client";
import { TypedAction } from "data/common";

import { Document } from "./model";

const enum ActionTypes {
  LOAD = "[Document] Load",

  LIST = "[Document] List",
  GET = "[Document] Get",
}
type Action = CreateAction | ListAction | GetAction;

interface CreateAction extends TypedAction<ActionTypes.LOAD> {
  payload: { document: Document };
}
const loadDocument = (document: Document): Action => ({
  type: ActionTypes.LOAD,
  payload: { document },
});

interface ListAction extends TypedAction<ActionTypes.LIST> {}
const listDocuments = (): Action =>
  clientRequest(ActionTypes.LIST, "GET", "documents");

interface GetAction extends TypedAction<ActionTypes.GET> {}
const getDocument = (documentId: string): Action =>
  clientRequest(ActionTypes.GET, "GET", `documents/${documentId}`);

export { Action, ActionTypes };
export { loadDocument, listDocuments, getDocument };
