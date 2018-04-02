import { List } from "immutable";
import { combineReducers } from "redux-immutable";

import { composeReducers } from "common/utils";

import { Action, ActionTypes } from "./actions";
import { Document } from "./model";

const documentReducer = (
  state: Document = new Document(),
  action: Action,
): Document => {
  switch (action.type) {
    case ActionTypes.LOAD_DOCUMENT: {
      return state;
    }

    default:
      return state;
  }
};
const subReducers = combineReducers<Document>({
  id: id => id || "",
  name: name => name || "",
  version: version => version || 0,
  include: include => include || List(),
});
const reducer = composeReducers(subReducers, documentReducer);

export { reducer };
