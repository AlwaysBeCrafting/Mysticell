import { TypedAction } from "data/common";

import { Source } from "./model";

const enum ActionTypes {
  CREATE = "[Source] Create",
}

type Action = CreateAction;

interface CreateAction extends TypedAction<ActionTypes.CREATE> {
  payload: { source: Source };
}

const createSource = (source: Source): Action => ({
  type: ActionTypes.CREATE,
  payload: { source },
});

export { ActionTypes, Action };
export { createSource };
