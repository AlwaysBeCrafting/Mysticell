import { Position2d } from "common/types";

import { TypedAction } from "data/common";

const enum ActionTypes {
  SET_LABEL = "[Card] Set label",
  SET_POSITION = "[Card] Set position",
}
type Action = SetLabelAction | SetPositionAction;

interface SetLabelAction extends TypedAction<ActionTypes.SET_LABEL> {
  readonly payload: { cardId: string; label: string };
}
const setLabel = (cardId: string, label: string): Action => ({
  type: ActionTypes.SET_LABEL,
  payload: { cardId, label },
});

interface SetPositionAction extends TypedAction<ActionTypes.SET_POSITION> {
  readonly payload: { cardId: string; position: Position2d };
}
const setPosition = (cardId: string, position: Position2d): Action => ({
  type: ActionTypes.SET_POSITION,
  payload: { cardId, position },
});

export { ActionTypes, Action };
export { setLabel, setPosition };
