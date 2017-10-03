import { Action } from "redux";
import { combineEpics } from "redux-observable";

import { userValueEpic } from "data/Node";
import { setPropertyInputEpic } from "data/PropertyInputs";

import { AppState } from "./model";


const appStateEpic = combineEpics<Action, AppState>(
	userValueEpic,
	setPropertyInputEpic,
);


export { appStateEpic };
