import { List, Map } from "immutable";
import { combineReducers } from "redux-immutable";

import { composeReducers } from "common/utils";

import { reducer as palette } from "data/Palette";

import { Action, ActionTypes } from "./actions";
import { Document } from "./model";

const documentReducer = (
  state: Document = new Document(),
  action: Action,
): Document => {
  switch (action.type) {
    case ActionTypes.LOAD_DOCUMENT: {
      return Document.fromJs(action.payload.documentJson);
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
  palette,
});
const reducer = composeReducers(subReducers, documentReducer);

export { reducer };
