import { combineReducers } from "redux-immutable";

import { composeReducers } from "common/utils";

import { reducer as cells } from "data/Cell";
import { reducer as directories } from "data/Directory";
import { reducer as documents } from "data/Document";
import { reducer as nodes } from "data/Node";
import { reducer as sheets } from "data/Sheet";
import { reducer as sources } from "data/Source";
import { reducer as wires } from "data/Wire";

import { Action, ActionTypes } from "./actions";
import { EntityState } from "./model";

const identity = (x: any) => x;

const entitiesReducer = combineReducers<EntityState>({
  cells,
  directories,
  documents,
  nodes,
  sheets,
  sources,
  wires,
  rows: identity,

  sheetDocuments: identity,
  directoryDocuments: identity,
  sourceDocuments: identity,

  entityParents: identity,

  nodeSources: identity,
  wireSources: identity,

  cellSheets: identity,

  propertyValues: identity,
});

const relationshipsReducer = (
  state: EntityState = new EntityState(),
  action: Action,
): EntityState => {
  switch (action.type) {
    case ActionTypes.SET_DIRECTORY_DOCUMENT: {
      const { directoryId, documentId } = action.payload;
      return state.setIn(["directoryDocuments", directoryId], documentId);
    }
    case ActionTypes.SET_SOURCE_DOCUMENT: {
      const { sourceId, documentId } = action.payload;
      return state.setIn(["sourceDocuments", sourceId], documentId);
    }
    case ActionTypes.SET_SHEET_DOCUMENT: {
      const { sheetId, documentId } = action.payload;
      return state.setIn(["sheetDocuments", sheetId], documentId);
    }
    case ActionTypes.SET_ENTITY_PARENT: {
      const { entityId, parentId } = action.payload;
      return state.setIn(["entityParents", entityId], parentId);
    }
    case ActionTypes.SET_NODE_SOURCE: {
      const { nodeId, sourceId } = action.payload;
      return state.setIn(["nodeSources", nodeId], sourceId);
    }
    case ActionTypes.SET_WIRE_SOURCE: {
      const { wireId, sourceId } = action.payload;
      return state.setIn(["wireSources", wireId], sourceId);
    }
    case ActionTypes.SET_CELL_SHEET: {
      const { cellId, sheetId } = action.payload;
      return state.setIn(["cellSheets", cellId], sheetId);
    }
    default:
      return state;
  }
};

const reducer = composeReducers(entitiesReducer, relationshipsReducer);

export { reducer };
