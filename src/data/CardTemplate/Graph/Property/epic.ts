import Redux from "redux";
import { ActionsObservable, combineEpics } from "redux-observable";

import { Observable } from "common/rxjs";

import { AppState } from "data/AppState";
import { resolveGraph } from "data/utils";

import { Action, ActionTypes, setInputValue, setOutputValues } from "./actions";

const setInputValueEpic = (
  action$: ActionsObservable<Action>,
): Observable<Redux.Action> =>
  action$
    .ofType(ActionTypes.SET_INPUT_VALUE_ASYNC)
    .debounceTime(300)
    .mergeMap((action: Action) => {
      if (action.type !== ActionTypes.SET_INPUT_VALUE_ASYNC) {
        return [];
      }
      const { propertyId, node, value } = action.payload;
      return [setInputValue(propertyId, node, value)];
    });

const setOutputValuesEpic = (
  action$: ActionsObservable<Action>,
  store: Redux.Store<AppState>,
): Observable<Redux.Action> =>
  action$.ofType(ActionTypes.SET_INPUT_VALUE).mergeMap((action: Action) => {
    if (action.type !== ActionTypes.SET_INPUT_VALUE) {
      return [];
    }
    const { propertyId } = action.payload;
    const { palette } = store.getState().document;
    return [
      setOutputValues(
        propertyId,
        resolveGraph(palette.getProperty(propertyId)!, palette),
      ),
    ];
  });
const epic = combineEpics(setInputValueEpic, setOutputValuesEpic);

export { epic };
