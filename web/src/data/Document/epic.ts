import { ActionsObservable, combineEpics } from "redux-observable";

import "common/rxjs";

import {
  ActionTypes as ClientActionTypes,
  ClientResponseAction,
} from "data/client";

import { ActionTypes, createDocument } from "./actions";
import { Document } from "./model";
import { Observable } from "common/rxjs";

const indexEpic = combineEpics(
  (action$: ActionsObservable<ClientResponseAction>) =>
    action$
      .ofType(ClientActionTypes.RESPONSE)
      .filter(action => action.originalType === ActionTypes.INDEX)
      .flatMap(action =>
        Observable.of(...action.json).map(js => new Document(js)),
      )
      .map(createDocument),
);

const epic = combineEpics(indexEpic);

export { epic };
