import { combineEpics } from "redux-observable";

import { epic as propertyEpic } from "./Property";

const epic = combineEpics(propertyEpic);

export { epic };
