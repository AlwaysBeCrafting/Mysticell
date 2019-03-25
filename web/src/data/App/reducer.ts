import { List, Map } from "immutable";
import { ReducersMapObject } from "redux";
import { combineReducers } from "redux-immutable";

import { reducer as cells } from "data/Cell";
import { reducer as documents } from "data/Document";
import { reducer as nodes } from "data/Node";
import { reducer as sheets } from "data/Sheet";
import { reducer as sources } from "data/Source";
import { reducer as wires } from "data/Wire";

import { App } from "./model";

type Index = Map<string, List<string>>;

const emptyIndex = (i: Index | undefined): Index => i || Map();

const rmo: ReducersMapObject = {
  cells,

  documents,
  documentSheets: emptyIndex,
  documentSources: emptyIndex,

  nodes,
  nodeSources: emptyIndex,

  sheets,
  sheetCells: emptyIndex,

  sources,
  formulaNodes: emptyIndex,
  formulaWires: emptyIndex,

  wires,
  wireNodes: emptyIndex,
};

const reducer = combineReducers(rmo, () => new App() as any);

export { reducer };
