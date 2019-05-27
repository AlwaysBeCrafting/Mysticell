import { TypedAction } from "~/data/common";

import { Cell } from "./model";

const enum ActionTypes {
  INSERT = "[Cell] Create",
}

interface InsertAction extends TypedAction<ActionTypes.INSERT> {
  payload: { cell: Cell };
}

type Action = InsertAction;

export { ActionTypes, Action };
