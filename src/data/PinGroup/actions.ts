import { TypedAction } from "data/common";

const enum ActionTypes {
  CREATE = "[PinGroup] Create",
  DELETE = "[PinGroup] Delete",

  ADD_PIN = "[PinGroup] Add pin",
  REMOVE_PIN = "[PinGroup] Remove pin",
  SET_PIN_NAME = "[PinGroup] Set pin name",
}

type Action =
  | CreateAction
  | DeleteAction
  | AddPinAction
  | RemovePinAction
  | SetPinNameAction;

interface CreateAction extends TypedAction<ActionTypes.CREATE> {
  payload: {
    id: string;
  };
}
const createPinGroup = (id: string): Action => ({
  type: ActionTypes.CREATE,
  payload: { id },
});

interface DeleteAction extends TypedAction<ActionTypes.DELETE> {
  payload: {
    id: string;
  };
}
const deletePinGroup = (id: string): Action => ({
  type: ActionTypes.DELETE,
  payload: { id },
});

interface AddPinAction extends TypedAction<ActionTypes.ADD_PIN> {
  payload: {
    id: string;
    name: string;
  };
}
const addPin = (id: string, name: string): Action => ({
  type: ActionTypes.ADD_PIN,
  payload: { id, name },
});

interface RemovePinAction extends TypedAction<ActionTypes.REMOVE_PIN> {
  payload: {
    id: string;
    index: number;
  };
}
const removePin = (id: string, index: number): Action => ({
  type: ActionTypes.REMOVE_PIN,
  payload: { id, index },
});

interface SetPinNameAction extends TypedAction<ActionTypes.SET_PIN_NAME> {
  payload: {
    id: string;
    index: number;
    name: string;
  };
}
const setPinName = (id: string, index: number, name: string): Action => ({
  type: ActionTypes.SET_PIN_NAME,
  payload: { id, index, name },
});

export { Action, ActionTypes };
export { createPinGroup, deletePinGroup, addPin, removePin, setPinName };
