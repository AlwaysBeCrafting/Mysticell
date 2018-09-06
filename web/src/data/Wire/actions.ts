import { TypedAction } from "data/common";

import { Wire } from "./model";

const enum ActionTypes {
  CREATE = "[Wire] Create",
}

type Action = CreateAction;

interface CreateAction extends TypedAction<ActionTypes.CREATE> {
  payload: { wire: Wire };
}

const createWire = (wire: Wire): Action => ({
  type: ActionTypes.CREATE,
  payload: { wire },
});

export { ActionTypes, Action };
export { createWire };
