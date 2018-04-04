import { TypedAction } from "data/common";
import { Directory } from "data/Directory";

const enum ActionTypes {
  CREATE = "[Directory] Create",
}

type Action = CreateAction;

interface CreateAction extends TypedAction<ActionTypes.CREATE> {
  payload: { directory: Directory };
}

const createDirectory = (directory: Directory): Action => ({
  type: ActionTypes.CREATE,
  payload: { directory },
});

export { ActionTypes, Action };

export { createDirectory };
