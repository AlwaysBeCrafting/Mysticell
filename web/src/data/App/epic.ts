import { combineEpics } from "redux-observable";

import { epic as documentEpic } from "data/Document";
import { epic as sourceEpic } from "data/Source";
import { epic as sheetEpic } from "data/Sheet";

import { Action } from "./actions";
import { App } from "./model";

const epic = combineEpics<Action, App>(documentEpic, sourceEpic, sheetEpic);

export { epic };
