import { TypedAction } from "~/data/common";

import { Document } from "./model";

const enum ActionTypes {
  INSERT = "[Document] Insert",

  LIST = "[Document] List",
  GET = "[Document] Get",
}

interface CreateAction extends TypedAction<ActionTypes.INSERT> {
  payload: { document: Document };
}
interface ListAction extends TypedAction<ActionTypes.LIST> {}
interface GetAction extends TypedAction<ActionTypes.GET> {}

type Action = CreateAction | ListAction | GetAction;

export { Action, ActionTypes };
