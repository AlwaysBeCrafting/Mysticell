import { Store } from "redux";
import { ActionsObservable } from "redux-observable";

import { Observable } from "common/rxjs";

import { AppState } from "data/AppState";
import { isProperty, setOutputValues } from "data/CardTemplate";
import { resolveGraph } from "data/utils";

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
      if (isProperty(property)) {
        return [
          setOutputValues(
            property.id,
            resolveGraph(property, store.getState().document.palette),
          ),
        ];
      } else {
        return [];
      }
    }),
  );

const epic = initPropertyCacheEpic;

export { epic };
