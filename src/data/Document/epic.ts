import { ActionsObservable } from "redux-observable";

import { Observable } from "common/rxjs";

import { resolveGraph } from "data/Graph";
import { isProperty } from "data/NodePrototype";
import { setParams } from "data/PropertyCache";

import { Action, ActionTypes } from "./actions";

const initPropertyCacheEpic = (action$: ActionsObservable<Action>) =>
  action$
    .ofType(ActionTypes.LOAD_DOCUMENT)
    .mergeMap(({ payload: { documentJson } }) =>
      Observable.of(...Object.values(documentJson.nodePrototypes))
        .filter(formula => isProperty(formula))
        .mergeMap(property => {
          if (!isProperty(property)) {
            return [];
          }
          return resolveGraph(
            documentJson.nodePrototypes,
            property,
          ).then(params => setParams(property.id, params));
        }),
    );

const epic = initPropertyCacheEpic;

export { epic };
