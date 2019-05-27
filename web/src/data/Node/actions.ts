import { Position2d } from "~/common/types";

import { TypedAction } from "~/data/common";
import { Node } from "~/data/Node";

const enum ActionTypes {
  INSERT = "[Node] Insert",
  DELETE = "[Node] Delete",

  SET_LABEL = "[Node] Set label",
  SET_POSITION = "[Node] Set position",
}

interface InsertAction extends TypedAction<ActionTypes.INSERT> {
  payload: {
    node: Node;
  };
}
interface DeleteAction extends TypedAction<ActionTypes.DELETE> {
  payload: {
    id: string;
  };
}
interface SetLabelAction extends TypedAction<ActionTypes.SET_LABEL> {
  payload: {
    id: string;
    label: string | undefined;
  };
}
interface SetPositionAction extends TypedAction<ActionTypes.SET_POSITION> {
  payload: {
    id: string;
    position: Position2d;
  };
}

type Action = InsertAction | DeleteAction | SetLabelAction | SetPositionAction;

export { Action, ActionTypes };
