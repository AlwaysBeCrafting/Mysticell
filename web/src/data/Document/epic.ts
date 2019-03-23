import { ActionsObservable, combineEpics } from "redux-observable";

import "common/rxjs";

import {
  ActionTypes as ClientActionTypes,
  ClientResponseAction,
} from "data/client";

import { ActionTypes, loadDocument } from "./actions";
import { Document } from "./model";
import { Observable } from "common/rxjs";

const listEpic = (action$: ActionsObservable<ClientResponseAction>) =>
  action$
    .ofType(ClientActionTypes.RESPONSE)
    .filter(action => action.originalType === ActionTypes.LIST)
    .flatMap(action =>
      Observable.of(...action.json).map(js => new Document(js)),
    )
    .map(loadDocument);

const getEpic = (action$: ActionsObservable<ClientResponseAction>) =>
  action$
    .ofType(ClientActionTypes.RESPONSE)
    .filter(action => action.originalType === ActionTypes.GET)
    .map(action => new Document(action.json))
    .map(loadDocument);

const epic = combineEpics(listEpic, getEpic);

export { epic };
