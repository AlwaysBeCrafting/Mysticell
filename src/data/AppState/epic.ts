import { Action } from "redux";
import { combineEpics } from "redux-observable";

import { userValueEpic } from "data/Node";
import { setPropertyInputEpic, updatePropertyCacheEpic } from "data/PropertyInputs";

import { AppState } from "./model";


const appStateEpic = combineEpics<Action, AppState>(
	userValueEpic,
	setPropertyInputEpic,
	updatePropertyCacheEpic,
);


export { appStateEpic };
