import { Store } from "redux";
import { ActionsObservable } from "redux-observable";

import { Observable } from "common/rxjs";

import { AppState } from "data/AppState";
import { isProperty } from "data/CardTemplate";

import { Action, ActionTypes } from "./actions";

const initPropertyCacheEpic = (
  action$: ActionsObservable<Action>,
  store: Store<AppState>,
) =>
  action$.ofType(ActionTypes.LOAD_DOCUMENT).mergeMap((_: any) =>
    Observable.of(
      ...store
        .getState()
        .document.palette.templates.filter(template => isProperty(template))
        .toList(),
    ).mergeMap(property => {
      if (!isProperty(property)) {
        return [];
      }
      return [];
      // return resolveGraph(
      //   store.getState().document.nodePrototypes,
      //   property,
      // ).then(params => setParams(property.id, params));
    }),
  );

const epic = initPropertyCacheEpic;

export { epic };
