import { combineEpics } from "redux-observable";

import { epic as cardTemplateEpic } from "data/CardTemplate";
import { epic as documentEpic } from "data/Document";

const appStateEpic = combineEpics(documentEpic, cardTemplateEpic);

export { appStateEpic };
