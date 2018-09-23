import { combineEpics } from "redux-observable";

import { epic as documentEpic } from "data/Document";

const epic = combineEpics(documentEpic);

export { epic };
