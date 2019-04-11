import { Reducer, ReducersMapObject } from "redux";
import { combineReducers } from "redux-immutable";

import { reducer as cells } from "data/Cell";
import { Relation } from "data/common";
import { reducer as documents } from "data/Document";
import { reducer as nodes } from "data/Node";
import { reducer as sheets } from "data/Sheet";
import { reducer as sources } from "data/Source";
import { reducer as wires } from "data/Wire";

import { App } from "./model";
import { Action } from "./actions";

const identity = <S>(defaultValue: S): Reducer<S> => (
  s: S | undefined = defaultValue,
) => s as S;

const reducersMapObject: ReducersMapObject = {
  cells,
  cellSheets: identity(new Relation.HasOne()),
  cellDocuments: identity(new Relation.HasOne()),

  documents,
  documentCells: identity(new Relation.HasMany()),
  documentDirectories: identity(new Relation.HasMany()),
  documentNodes: identity(new Relation.HasMany()),
  documentSheets: identity(new Relation.HasMany()),
  documentSources: identity(new Relation.HasMany()),
  documentWires: identity(new Relation.HasMany()),

  nodes,
  nodeDocuments: identity(new Relation.HasOne()),
  nodeFormulas: identity(new Relation.HasOne()),
  nodeSources: identity(new Relation.HasOne()),

  sheets,
  sheetCells: identity(new Relation.HasMany()),
  sheetDocuments: identity(new Relation.HasOne()),

  sources,
  sourceParents: identity(new Relation.HasOne()),
  formulaNodes: identity(new Relation.HasMany()),
  formulaWires: identity(new Relation.HasMany()),

  wires,
  wireNodes: identity(new Relation.HasMany()),
  wireFormulas: identity(new Relation.HasOne()),
};

const reducer = combineReducers<App, Action>(reducersMapObject);

export { reducer };
