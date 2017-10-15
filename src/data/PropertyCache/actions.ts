import { Param, TypedAction } from "data/common";

const enum ActionTypes {
  SET_PARAMS = "[PropertyCache] Set params",
}
type Action = SetParamsAction;

interface SetParamsAction extends TypedAction<ActionTypes.SET_PARAMS> {
  payload: { propertyId: string; params: Param[] };
}
const setParams = (propertyId: string, params: Param[]): Action => ({
  type: ActionTypes.SET_PARAMS,
  payload: { propertyId, params },
});

export { Action, ActionTypes };
export { setParams };
