import { TypedAction } from "data/common";

import { Document } from "./model";

const enum ActionTypes {
  CREATE = "[Document] Create",
}
type Action = CreateAction;

interface CreateAction extends TypedAction<ActionTypes.CREATE> {
  payload: { document: Document };
}
const createDocument = (document: Document): Action => ({
  type: ActionTypes.CREATE,
  payload: { document },
});

export { Action, ActionTypes };
export { createDocument };
