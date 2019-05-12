import { Position2d } from "~/common/types";

import { TypedAction } from "~/data/common";
import { Node } from "~/data/Node";

const enum ActionTypes {
  CREATE = "[Node] Create",
  DELETE = "[Node] Delete",

  SET_LABEL = "[Node] Set label",
  SET_POSITION = "[Node] Set position",
}

type Action = CreateAction | DeleteAction | SetLabelAction | SetPositionAction;

interface CreateAction extends TypedAction<ActionTypes.CREATE> {
  payload: {
    node: Node;
  };
}
const createNode = (node: Node): Action => ({
  type: ActionTypes.CREATE,
  payload: { node },
});

interface DeleteAction extends TypedAction<ActionTypes.DELETE> {
  payload: {
    id: string;
  };
}
const deleteNode = (id: string): Action => ({
  type: ActionTypes.DELETE,
  payload: { id },
});

interface SetLabelAction extends TypedAction<ActionTypes.SET_LABEL> {
  payload: {
    id: string;
    label: string | undefined;
  };
}
const setLabel = (id: string, label: string): Action => ({
  type: ActionTypes.SET_LABEL,
  payload: { id, label },
});

interface SetPositionAction extends TypedAction<ActionTypes.SET_POSITION> {
  payload: {
    id: string;
    position: Position2d;
  };
}
const setPosition = (id: string, position: Position2d): Action => ({
  type: ActionTypes.SET_POSITION,
  payload: { id, position },
});

export { Action, ActionTypes };
export { createNode, deleteNode, setLabel, setPosition };
