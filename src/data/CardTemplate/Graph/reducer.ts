import { Map } from "immutable";

import { Graph } from "common/types";
import { composeReducers } from "common/utils";

import { CardTemplate } from "data/CardTemplate";

import { Action, ActionTypes } from "./actions";
import { isGraph, NodeValue } from "./model";

import { reducer as propertyReducer } from "./Property";

function commonReducer(
  state: Map<string, CardTemplate> = Map(),
  action: Action,
) {
  if (!isGraph(state.get(action.payload.templateId))) {
    return state;
  }
  switch (action.type) {
    case ActionTypes.ADD_CARD: {
      const { templateId, card } = action.payload;
      return state.setIn([templateId, "cards", card.id], card);
    }
    case ActionTypes.REMOVE_CARD: {
      const { templateId, cardId } = action.payload;
      return state.removeIn([templateId, "cards", cardId]);
    }
    case ActionTypes.PLACE_CARD: {
      const { templateId, cardId, position } = action.payload;
      return state.setIn([templateId, "cards", cardId, "position"], position);
    }
    case ActionTypes.CONNECT_NODES: {
      const { templateId, sourceId, targetId } = action.payload;
      return state.updateIn(
        [templateId, "graph"],
        (graph: Graph<NodeValue, {}>) =>
          graph.connectNodes(sourceId, targetId, {}),
      );
    }
    default: {
      return state;
    }
  }
}

const reducer = composeReducers(commonReducer, propertyReducer);

export { reducer };
