import { TypedAction } from "data/common";
import { clientRequest } from "data/client";

import { Source } from "./model";

const enum ActionTypes {
  LOAD = "[Source] Load",

  LIST = "[Source] List",
  GET = "[Source] Get",
}

type Action = CreateAction | ListAction | GetAction;

interface CreateAction extends TypedAction<ActionTypes.LOAD> {
  payload: { source: Source };
}
const loadSource = (source: Source): Action => ({
  type: ActionTypes.LOAD,
  payload: { source },
});

interface ListAction extends TypedAction<ActionTypes.LIST> {}
const listSources = (documentId: string): Action =>
  clientRequest(ActionTypes.LIST, "GET", `documents/${documentId}/sources`);

interface GetAction extends TypedAction<ActionTypes.GET> {}
const getSource = (documentId: string, sourceId: string): GetAction =>
  clientRequest(
    ActionTypes.GET,
    "GET",
    `documents/${documentId}/sources/${sourceId}`,
  );

export { ActionTypes, Action };
export { loadSource, listSources, getSource };
