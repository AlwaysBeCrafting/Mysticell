import { combineReducers } from "redux-immutable";

import { reducer as cells } from "data/Cell";
import { Relation } from "data/common";
import { reducer as documents } from "data/Document";
import { reducer as nodes } from "data/Node";
import { reducer as sheets } from "data/Sheet";
import { reducer as sources } from "data/Source";
import { reducer as wires } from "data/Wire";

const emptyReducer = <T>(t: new () => T) => <S extends unknown>(
  s: S | undefined,
) => s || new t();

const reducer = combineReducers({
  cells,
  cellSheets: emptyReducer(Relation.HasOne),
  cellDocuments: emptyReducer(Relation.HasOne),

  documents,
  documentCells: emptyReducer(Relation.HasMany),
  documentDirectories: emptyReducer(Relation.HasMany),
  documentNodes: emptyReducer(Relation.HasMany),
  documentSheets: emptyReducer(Relation.HasMany),
  documentSources: emptyReducer(Relation.HasMany),
  documentWires: emptyReducer(Relation.HasMany),

  nodes,
  nodeDocuments: emptyReducer(Relation.HasOne),
  nodeFormulas: emptyReducer(Relation.HasOne),
  nodeSources: emptyReducer(Relation.HasMany),

  sheets,
  sheetCells: emptyReducer(Relation.HasMany),
  sheetDocuments: emptyReducer(Relation.HasOne),

  sources,
  sourceParents: emptyReducer(Relation.HasOne),
  formulaNodes: emptyReducer(Relation.HasMany),
  formulaWires: emptyReducer(Relation.HasMany),

  wires,
  wireNodes: emptyReducer(Relation.HasMany),
  wireFormulas: emptyReducer(Relation.HasOne),
});

export { reducer };
