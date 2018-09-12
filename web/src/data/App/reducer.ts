import { combineReducers } from "redux-immutable";

import { reducer as documents } from "data/Document";
import { reducer as sheets } from "data/Sheet";
import { reducer as cells } from "data/Cell";
import { reducer as directories } from "data/Directory";
import { reducer as sources } from "data/Source";
import { reducer as nodes } from "data/Node";
import { reducer as wires } from "data/Wire";

import { App } from "./model";

const identity = (x: any) => x;

const reducer = combineReducers<App>({
  cells,
  cellSheets: identity,
  cellDocuments: identity,

  directories,
  directoryParents: identity,
  directoryChildren: identity,
  directoryDocuments: identity,

  documents,
  documentCells: identity,
  documentDirectories: identity,
  documentNodes: identity,
  documentSheets: identity,
  documentSources: identity,
  documentWires: identity,

  nodes,
  nodeDocuments: identity,
  nodeFormulas: identity,
  nodeSources: identity,

  sheets,
  sheetCells: identity,
  sheetDocuments: identity,

  sources,
  sourceParents: identity,
  formulaNodes: identity,
  formulaWires: identity,

  wires,
  wireNodes: identity,
  wireFormulas: identity,
});

export { reducer };
