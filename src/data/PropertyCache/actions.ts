import { List } from "immutable";

import { Param, TypedAction } from "data/common";

const enum ActionTypes {
  SET_PARAMS = "[PropertyCache] Set params",
}
type Action = SetParamsAction;

interface SetParamsAction extends TypedAction<ActionTypes.SET_PARAMS> {
  payload: { propertyId: string; params: List<Param> };
}
const setParams = (propertyId: string, params: List<Param>): Action => ({
  type: ActionTypes.SET_PARAMS,
  payload: { propertyId, params },
});

export { Action, ActionTypes };
export { setParams };
