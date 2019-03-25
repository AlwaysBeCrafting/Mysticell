import { TypedAction } from "data/common";

import { Cell } from "./model";

const enum ActionTypes {
  CREATE = "[Cell] Create",
}

type Action = CreateAction;

interface CreateAction extends TypedAction<ActionTypes.CREATE> {
  payload: { cell: Cell };
}

const createCell = (cell: Cell): Action => ({
  type: ActionTypes.CREATE,
  payload: { cell },
});

export { ActionTypes, Action };
export { createCell };
