import { TypedAction } from "data/common";

import { Formula } from "./model";

const enum ActionTypes {
  CREATE = "[Formula] Create",
  DELETE = "[Formula] Delete",

  ADD_NODE = "[Formula] Add node",
  REMOVE_NODE = "[Formula] Remove node",
}

type Action = CreateAction | DeleteAction | AddNodeAction | RemoveNodeAction;

interface CreateAction extends TypedAction<ActionTypes.CREATE> {
  payload: {
    formula: Formula;
  };
}
const createFormula = (formula: Formula): Action => ({
  type: ActionTypes.CREATE,
  payload: { formula },
});

interface DeleteAction extends TypedAction<ActionTypes.DELETE> {
  payload: {
    id: string;
  };
}
const deleteFormula = (id: string): Action => ({
  type: ActionTypes.DELETE,
  payload: { id },
});

interface AddNodeAction extends TypedAction<ActionTypes.ADD_NODE> {
  payload: {
    formulaId: string;
    nodeId: string;
  };
}
const addNode = (formulaId: string, nodeId: string): Action => ({
  type: ActionTypes.ADD_NODE,
  payload: { formulaId, nodeId },
});

interface RemoveNodeAction extends TypedAction<ActionTypes.REMOVE_NODE> {
  payload: {
    formulaId: string;
    nodeId: string;
  };
}
const removeNode = (formulaId: string, nodeId: string): Action => ({
  type: ActionTypes.REMOVE_NODE,
  payload: { formulaId, nodeId },
});

export { Action, ActionTypes };
export { createFormula, deleteFormula, addNode, removeNode };
