import { combineReducers } from "redux-immutable";

import { reducer as documents } from "data/Document";
import { reducer as sheets } from "data/Sheet";
import { reducer as cells } from "data/Cell";
import { reducer as directories } from "data/Directory";
import { reducer as sources } from "data/Source";
import { reducer as nodes } from "data/Node";
import { reducer as wires } from "data/Wire";

import { App } from "./model";

const reducer = combineReducers<App>({
  cells,
  directories,
  documents,
  nodes,
  sheets,
  sources,
  wires,
});

export { reducer };
