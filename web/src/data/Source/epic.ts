import { ActionsObservable, combineEpics, ofType } from "redux-observable";
import { of } from "rxjs";
import { filter, flatMap, map } from "rxjs/operators";

import {
  ActionTypes as ClientActionTypes,
  ClientResponseAction,
  clientRequest,
} from "~/data/client";
import { ActionTypes as DocumentActionTypes } from "~/data/Document";

import { ActionTypes } from "./actions";
import { Source } from "./model";

const listEpic = (action$: ActionsObservable<ClientResponseAction>) =>
  action$.pipe(
    ofType(ClientActionTypes.RESPONSE),
    filter(action => action.originalType === ActionTypes.LIST),
    flatMap(action => of(...action.json).pipe(map(js => new Source(js)))),
    map(source => ({ type: ActionTypes.INSERT, payload: { source } })),
  );

const getEpic = (action$: ActionsObservable<ClientResponseAction>) =>
  action$.pipe(
    ofType(ClientActionTypes.RESPONSE),
    filter(action => action.originalType === ActionTypes.GET),
    map(action => new Source(action.json)),
    map(source => ({ type: ActionTypes.INSERT, payload: { source } })),
  );

const getDocumentEpic = (action$: ActionsObservable<ClientResponseAction>) =>
  action$.pipe(
    ofType(ClientActionTypes.RESPONSE),
    filter(action => action.originalType === DocumentActionTypes.GET),
    map(action =>
      clientRequest(
        ActionTypes.LIST,
        "GET",
        `documents/${action.json.id}/sources`,
      ),
    ),
  );

const epic = combineEpics(listEpic, getEpic, getDocumentEpic);

export { epic };
