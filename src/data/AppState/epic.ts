import { combineEpics } from "redux-observable";

import { initPropertyCacheEpic } from "data/Document";
import { epic as nodePrototypeEpic } from "data/NodePrototype";


const appStateEpic = combineEpics(
	initPropertyCacheEpic,
	nodePrototypeEpic,
);


export { appStateEpic };
