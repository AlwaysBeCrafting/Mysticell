import { Map } from "immutable";
import { Reducer } from "redux";

import { Action, ActionTypes } from "./actions";
import { Node } from "./model";

const reducer: Reducer<Map<string, Node>> = (
  state: Map<string, Node>,
  action: Action,
) => {
  switch (action.type) {
    case ActionTypes.CREATE: {
      const { node } = action.payload;
      return state.set(node.id, node);
    }
    case ActionTypes.DELETE: {
      const { id } = action.payload;
      return state.remove(id);
    }
    case ActionTypes.SET_LABEL: {
      const { id, label } = action.payload;
      return state.setIn([id, "label"], label);
    }
    case ActionTypes.SET_POSITION: {
      const { id, position } = action.payload;
      return state.setIn([id, "position"], position);
    }
    default:
      return state;
  }
};

export { reducer };
