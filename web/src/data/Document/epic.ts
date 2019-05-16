import { ActionsObservable, combineEpics, ofType } from "redux-observable";
import { of } from "rxjs";
import { filter, flatMap, map } from "rxjs/operators";

import {
  ActionTypes as ClientActionTypes,
  ClientResponseAction,
} from "~/data/client";

import { ActionTypes, loadDocument } from "./actions";
import { Document } from "./model";

const listEpic = (action$: ActionsObservable<ClientResponseAction>) =>
  action$.pipe(
    ofType(ClientActionTypes.RESPONSE),
    filter(action => action.originalType === ActionTypes.LIST),
    flatMap(action => of(...action.json).pipe(map(js => new Document(js)))),
    map(loadDocument),
  );

const getEpic = (action$: ActionsObservable<ClientResponseAction>) =>
  action$.pipe(
    ofType(ClientActionTypes.RESPONSE),
    filter(action => action.originalType === ActionTypes.GET),
    map(action => new Document(action.json)),
    map(loadDocument),
  );

const epic = combineEpics(listEpic, getEpic);

export { epic };
