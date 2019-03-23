import { ActionsObservable, combineEpics } from "redux-observable";

import "common/rxjs";

import {
  ActionTypes as ClientActionTypes,
  ClientResponseAction,
} from "data/client";

import { ActionTypes, loadSource } from "./actions";
import { Source } from "./model";
import { Observable } from "common/rxjs";

const listEpic = (action$: ActionsObservable<ClientResponseAction>) =>
  action$
    .ofType(ClientActionTypes.RESPONSE)
    .filter(action => action.originalType === ActionTypes.LIST)
    .flatMap(action => Observable.of(...action.json).map(js => new Source(js)))
    .map(loadSource);

const getEpic = (action$: ActionsObservable<ClientResponseAction>) =>
  action$
    .ofType(ClientActionTypes.RESPONSE)
    .filter(action => action.originalType === ActionTypes.GET)
    .map(action => new Source(action.json))
    .map(loadSource);

const epic = combineEpics(listEpic, getEpic);

export { epic };
