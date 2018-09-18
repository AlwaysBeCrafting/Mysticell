import { Action, ActionTypes } from "./actions";
import { Node } from "./model";
import { EntityTable } from "../common";

const reducer = (state: EntityTable<Node>, action: Action) => {
  switch (action.type) {
    case ActionTypes.CREATE: {
      const { node } = action.payload;
      return state.putEntity(node);
    }
    case ActionTypes.DELETE: {
      const { id } = action.payload;
      return state.removeEntity(id);
    }
    case ActionTypes.SET_LABEL: {
      const { id, label } = action.payload;
      return state.setInEntity(id, ["label"], label);
    }
    case ActionTypes.SET_POSITION: {
      const { id, position } = action.payload;
      return state.setInEntity(id, ["position"], position);
    }
    default:
      return state;
  }
};

export { reducer };
