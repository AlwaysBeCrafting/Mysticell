import { Action } from "redux";
import { combineEpics } from "redux-observable";

import { initPropertyCacheEpic } from "data/Document";
import { userValueEpic } from "data/Node";
import { setPropertyInputEpic, updatePropertyCacheEpic } from "data/PropertyInputs";

import { AppState } from "./model";


const appStateEpic = combineEpics<Action, AppState>(
	initPropertyCacheEpic,
	userValueEpic,
	updatePropertyCacheEpic,
	setPropertyInputEpic,
);


export { appStateEpic };
