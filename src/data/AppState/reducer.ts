import { combineReducers } from "redux-immutable";

import { reducer as entities } from "data/EntityState";

import { AppState } from "./model";

const reducer = combineReducers<AppState>({
  entities,
  ui: ui => ui || {},
});

export { reducer };
