import { ActionsObservable, combineEpics, ofType } from "redux-observable";
import { of } from "rxjs";
import { filter, flatMap, map } from "rxjs/operators";

import {
  ActionTypes as ClientActionTypes,
  ClientResponseAction,
} from "data/client";

import { ActionTypes, loadSource } from "./actions";
import { Source } from "./model";

const listEpic = (action$: ActionsObservable<ClientResponseAction>) =>
  action$.pipe(
    ofType(ClientActionTypes.RESPONSE),
    filter(action => action.originalType === ActionTypes.LIST),
    flatMap(action => of(...action.json).pipe(map(js => new Source(js)))),
    map(loadSource),
  );

const getEpic = (action$: ActionsObservable<ClientResponseAction>) =>
  action$.pipe(
    ofType(ClientActionTypes.RESPONSE),
    filter(action => action.originalType === ActionTypes.GET),
    map(action => new Source(action.json)),
    map(loadSource),
  );

const epic = combineEpics(listEpic, getEpic);

export { epic };
