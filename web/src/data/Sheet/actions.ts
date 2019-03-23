import { clientRequest } from "data/client";
import { TypedAction } from "data/common";
import { Sheet } from "data/Sheet";

const enum ActionTypes {
  LOAD = "[Sheet] Load",

  LIST = "[Sheet] List",
  GET = "[Sheet] Get",
}

type Action = LoadAction | ListAction | GetAction;

interface LoadAction extends TypedAction<ActionTypes.LOAD> {
  payload: { sheet: Sheet };
}
const loadSheet = (sheet: Sheet): Action => ({
  type: ActionTypes.LOAD,
  payload: { sheet },
});

interface ListAction extends TypedAction<ActionTypes.LIST> {}
const listSheets = (documentId: string): ListAction =>
  clientRequest(ActionTypes.LIST, "GET", `documents/${documentId}/sheets`);

interface GetAction extends TypedAction<ActionTypes.GET> {}
const getSheet = (documentId: string, sheetId: string): GetAction =>
  clientRequest(
    ActionTypes.GET,
    "GET",
    `documents/${documentId}/sheets/${sheetId}`,
  );

export { ActionTypes, Action };
export { loadSheet, listSheets, getSheet };
