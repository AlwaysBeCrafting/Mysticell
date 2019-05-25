import { ActionsObservable, combineEpics, ofType } from "redux-observable";
import { of } from "rxjs";
import { filter, flatMap, map } from "rxjs/operators";

import {
  ActionTypes as ClientActionTypes,
  ClientResponseAction,
} from "~/data/client";

import { ActionTypes } from "./actions";
import { Document } from "./model";

const listEpic = (action$: ActionsObservable<ClientResponseAction>) =>
  action$.pipe(
    ofType(ClientActionTypes.RESPONSE),
    filter(action => action.originalType === ActionTypes.LIST),
    flatMap(action => of(...action.json).pipe(map(js => new Document(js)))),
    map(document => ({ type: ActionTypes.INSERT, payload: { document } })),
  );

const getEpic = (action$: ActionsObservable<ClientResponseAction>) =>
  action$.pipe(
    ofType(ClientActionTypes.RESPONSE),
    filter(action => action.originalType === ActionTypes.GET),
    map(action => new Document(action.json)),
    map(document => ({ type: ActionTypes.INSERT, payload: { document } })),
  );

const epic = combineEpics(listEpic, getEpic);

export { epic };
