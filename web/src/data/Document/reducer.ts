import { Map, Set } from "immutable";
import { ReducersMapObject } from "redux";

import { EntityTable } from "~/data/common";
import {
  Action as SourceAction,
  ActionTypes as SourceActionTypes,
} from "~/data/Source";

import { Action, ActionTypes } from "./actions";
import { Document } from "./model";

const reducers: ReducersMapObject = {
  documents: (state = new EntityTable<Document>(), action: Action) => {
    switch (action.type) {
      case ActionTypes.INSERT: {
        const { document } = action.payload;
        return state.putEntity(document);
      }
      default:
        return state;
    }
  },

  documentSources: (
    state: Map<string, Set<string>> = Map(),
    action: SourceAction,
  ) => {
    switch (action.type) {
      case SourceActionTypes.INSERT: {
        const { id, documentId } = action.payload.source;
        return state.update(documentId, Set(), sources => sources.add(id));
      }
      default:
        return state;
    }
  },
};

export { reducers };
