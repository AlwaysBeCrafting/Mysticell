import { ActionsObservable, combineEpics } from "redux-observable";

import "common/rxjs";

import {
  ActionTypes as ClientActionTypes,
  ClientResponseAction,
} from "data/client";

import { ActionTypes, loadSheet } from "./actions";
import { Sheet } from "./model";
import { Observable } from "common/rxjs";

const listEpic = (action$: ActionsObservable<ClientResponseAction>) =>
  action$
    .ofType(ClientActionTypes.RESPONSE)
    .filter(action => action.originalType === ActionTypes.LIST)
    .flatMap(action => Observable.of(...action.json).map(js => new Sheet(js)))
    .map(loadSheet);

const getEpic = (action$: ActionsObservable<ClientResponseAction>) =>
  action$
    .ofType(ClientActionTypes.RESPONSE)
    .filter(action => action.originalType === ActionTypes.GET)
    .map(action => new Sheet(action.json))
    .map(loadSheet);

const epic = combineEpics(listEpic, getEpic);

export { epic };
