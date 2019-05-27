import { TypedAction } from "~/data/common";
import { Sheet } from "~/data/Sheet";

const enum ActionTypes {
  INSERT = "[Sheet] Insert",

  LIST = "[Sheet] List",
  GET = "[Sheet] Get",
}

interface InsertAction extends TypedAction<ActionTypes.INSERT> {
  payload: { sheet: Sheet };
}
interface ListAction extends TypedAction<ActionTypes.LIST> {}
interface GetAction extends TypedAction<ActionTypes.GET> {}

type Action = InsertAction | ListAction | GetAction;

export { ActionTypes, Action };
