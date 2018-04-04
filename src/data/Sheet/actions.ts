import { TypedAction } from "data/common";
import { Sheet } from "data/Sheet";

const enum ActionTypes {
  CREATE = "[Sheet] Create",
}

type Action = CreateAction;

interface CreateAction extends TypedAction<ActionTypes.CREATE> {
  payload: { sheet: Sheet };
}

const createSheet = (sheet: Sheet): Action => ({
  type: ActionTypes.CREATE,
  payload: { sheet },
});

export { ActionTypes, Action };
export { createSheet };
