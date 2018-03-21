import { TypedAction } from "data/common";

import { Property } from "./model";

const enum ActionTypes {
  CREATE = "[Property] Create",
  DELETE = "[Property] Delete",

  SET_NAME = "[Property] Set name",
}

type Action = CreateAction | DeleteAction | SetNameAction;

interface CreateAction extends TypedAction<ActionTypes.CREATE> {
  payload: {
    property: Property;
  };
}
const createProperty = (property: Property): Action => ({
  type: ActionTypes.CREATE,
  payload: { property },
});

interface DeleteAction extends TypedAction<ActionTypes.DELETE> {
  payload: {
    id: string;
  };
}
const deleteProperty = (id: string): Action => ({
  type: ActionTypes.DELETE,
  payload: { id },
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
export { createProperty, deleteProperty, setOutputName };
