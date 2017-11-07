import { TypedAction } from "data/common";

const enum ActionTypes {
  SET_NAME = "[Template] Set name",
}
type Action = SetNameAction;

interface SetNameAction extends TypedAction<ActionTypes.SET_NAME> {
  readonly payload: { templateId: string; name: string };
}
const setName = (templateId: string, name: string) => ({
  type: ActionTypes.SET_NAME,
  payload: { templateId, name },
});

export { Action, ActionTypes };
export { setName };
