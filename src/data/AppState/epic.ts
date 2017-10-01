import { combineEpics } from "redux-observable";

import { userValueEpic } from "data/Node";


const appStateEpic = combineEpics(
	userValueEpic,
);


export { appStateEpic };
