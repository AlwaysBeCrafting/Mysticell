import { combineEpics } from "redux-observable";

import { epic as documentEpic } from "data/Document";
import { epic as nodePrototypeEpic } from "data/NodePrototype";

const appStateEpic = combineEpics(documentEpic, nodePrototypeEpic);

export { appStateEpic };
