import { Position2d } from "common/types";

import { Card } from "data/Card";
import { TypedAction } from "data/common";

const enum ActionTypes {
  ADD_CARD = "[Template.Graph] Add card",
  REMOVE_CARD = "[Template.Graph] Remove card",
  PLACE_CARD = "[Template.Graph] Place card",
  CONNECT_NODES = "[Template.Graph] Connect nodes",
}
type Action =
  | AddCardAction
  | RemoveCardAction
  | PlaceCardAction
  | ConnectNodesAction;

interface AddCardAction extends TypedAction<ActionTypes.ADD_CARD> {
  payload: { templateId: string; card: Card };
}
const addCard = (templateId: string, card: Card): Action => ({
  type: ActionTypes.ADD_CARD,
  payload: { templateId, card },
});

interface RemoveCardAction extends TypedAction<ActionTypes.REMOVE_CARD> {
  payload: { templateId: string; cardId: string };
}
const removeCard = (templateId: string, cardId: string): Action => ({
  type: ActionTypes.REMOVE_CARD,
  payload: { templateId, cardId },
});

interface PlaceCardAction extends TypedAction<ActionTypes.PLACE_CARD> {
  payload: { templateId: string; cardId: string; position: Position2d };
}
const placeCard = (
  templateId: string,
  cardId: string,
  position: Position2d,
): Action => ({
  type: ActionTypes.PLACE_CARD,
  payload: { templateId, cardId, position },
});

interface ConnectNodesAction extends TypedAction<ActionTypes.CONNECT_NODES> {
  payload: {
    templateId: string;
    sourceId: string;
    targetId: string;
  };
}
const connectNodes = (
  templateId: string,
  sourceId: string,
  targetId: string,
): Action => ({
  type: ActionTypes.CONNECT_NODES,
  payload: { templateId, sourceId, targetId },
});

export { Action, ActionTypes };
export { addCard, removeCard, placeCard, connectNodes };
