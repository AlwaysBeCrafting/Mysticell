import { TypedAction } from "data/common";

import { Func } from "./model";

const enum ActionTypes {
  CREATE = "[Func] Create",
  DELETE = "[Func] Delete",

  SET_NAME = "[Func] Set name",
}

type Action = CreateAction | DeleteAction | SetNameAction;

interface CreateAction extends TypedAction<ActionTypes.CREATE> {
  payload: { func: Func };
}
const createFunc = (func: Func): Action => ({
  type: ActionTypes.CREATE,
  payload: {
    func,
  },
});

interface DeleteAction extends TypedAction<ActionTypes.DELETE> {
  payload: { id: string };
}
const deleteFunc = (id: string): Action => ({
  type: ActionTypes.DELETE,
  payload: {
    id,
  },
});

interface SetNameAction extends TypedAction<ActionTypes.SET_NAME> {
  payload: {
    id: string;
    name: string;
  };
}
const setOutputName = (id: string, name: string): Action => ({
  type: ActionTypes.SET_NAME,
  payload: { id, name },
});

export { Action, ActionTypes };
export { createFunc, deleteFunc, setOutputName };
