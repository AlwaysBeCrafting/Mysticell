import { combineEpics } from "redux-observable";

import { epic as documentEpic } from "~/data/Document";
import { epic as sourceEpic } from "~/data/Source";
import { epic as sheetEpic } from "~/data/Sheet";

import { Action } from "./actions";

const epic = combineEpics<Action>(documentEpic, sourceEpic, sheetEpic);

export { epic };
