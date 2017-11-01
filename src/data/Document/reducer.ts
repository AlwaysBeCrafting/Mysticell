import { List, Map } from "immutable";
import { combineReducers } from "redux-immutable";

import { composeReducers } from "common/utils";

import { reducer as nodePrototypes } from "data/NodePrototype";

import { Action, ActionTypes } from "./actions";
import { Document } from "./model";

const documentReducer = (
  state: Document = new Document(),
  action: Action,
): Document => {
  switch (action.type) {
    case ActionTypes.LOAD_DOCUMENT: {
      return Document.fromJson(action.payload.documentJson);
    }

    default:
      return state;
  }
};
const subReducers = combineReducers<Document>({
  id: id => id || "",
  title: title => title || "",
  version: version => version || 0,
  include: include => include || List(),

  sheets: sheets => sheets || Map(),
  nodePrototypes,

  nav: nav => nav || {},
});
const reducer = composeReducers(documentReducer, subReducers);

export { reducer };
