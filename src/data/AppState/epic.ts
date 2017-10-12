import { Action } from "redux";
import { combineEpics } from "redux-observable";

import { initPropertyCacheEpic } from "data/Document";

import { AppState } from "./model";


const appStateEpic = combineEpics<Action, AppState>(
	initPropertyCacheEpic,
);


export { appStateEpic };
