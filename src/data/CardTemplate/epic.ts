import { combineEpics } from "redux-observable";

import { epic as graphEpic } from "./Graph";

const epic = combineEpics(graphEpic);

export { epic };
