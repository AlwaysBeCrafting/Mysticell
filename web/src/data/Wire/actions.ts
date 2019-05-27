import { TypedAction } from "~/data/common";

import { Wire } from "./model";

const enum ActionTypes {
  INSERT = "[Wire] Insert",
}

interface InsertAction extends TypedAction<ActionTypes.INSERT> {
  payload: { wire: Wire };
}

type Action = InsertAction;

export { ActionTypes, Action };
