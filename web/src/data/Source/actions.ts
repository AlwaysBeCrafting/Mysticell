import { TypedAction } from "~/data/common";

import { Source } from "./model";

const enum ActionTypes {
  INSERT = "[Source] Insert",

  LIST = "[Source] List",
  GET = "[Source] Get",
}

type Action = CreateAction | ListAction | GetAction;

interface CreateAction extends TypedAction<ActionTypes.INSERT> {
  payload: { source: Source };
}
interface ListAction extends TypedAction<ActionTypes.LIST> {}
interface GetAction extends TypedAction<ActionTypes.GET> {}

export { ActionTypes, Action };
