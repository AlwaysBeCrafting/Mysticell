import Redux from "redux";
import { ActionsObservable, combineEpics } from "redux-observable";

import { Observable } from "common/rxjs";

import { Action, ActionTypes, setInputValue } from "./actions";

const changeInputValueEpic = (
  action$: ActionsObservable<Action>,
): Observable<Redux.Action> =>
  action$
    .ofType(ActionTypes.SET_INPUT_VALUE_ASYNC)
    .debounceTime(300)
    .map(action => {
      const { propertyId, node, value } = action.payload;
      return setInputValue(propertyId, node, value);
    });

const epic = combineEpics(changeInputValueEpic);

export { epic };
