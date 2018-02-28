import { Graph } from "filament";
import { Map } from "immutable";

import { composeReducers } from "common/utils";

import { CardTemplate } from "data/CardTemplate";

import { Action, ActionTypes } from "./actions";
import { NodeValue } from "./model";

import { reducer as propertyReducer } from "./Property";

function commonReducer(
  state: Map<string, CardTemplate> = Map(),
  action: Action,
) {
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
        (graph: Graph<NodeValue, {}>) => graph.connect(sourceId, targetId, {}),
      );
    }
    default: {
      return state;
    }
  }
}

const reducer = composeReducers(commonReducer, propertyReducer);

export { reducer };
