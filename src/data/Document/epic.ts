import { Store } from "redux";
import { ActionsObservable } from "redux-observable";

import { Observable } from "common/rxjs";

import { AppState } from "data/AppState";
import { resolveGraph } from "data/Graph";
import { isProperty } from "data/NodePrototype";
import { setParams } from "data/PropertyCache";

import { Action, ActionTypes } from "./actions";

const initPropertyCacheEpic = (
  action$: ActionsObservable<Action>,
  store: Store<AppState>,
) =>
  action$.ofType(ActionTypes.LOAD_DOCUMENT).mergeMap((_: any) =>
    Observable.of(
      ...store
        .getState()
        .document.nodePrototypes.filter(formula => isProperty(formula))
        .toList(),
    ).mergeMap(property => {
      if (!isProperty(property)) {
        return [];
      }
      return resolveGraph(
        store.getState().document.nodePrototypes,
        property,
      ).then(params => setParams(property.id, params));
    }),
  );

const epic = initPropertyCacheEpic;

export { epic };
