import { TypedAction } from "data/common";

const enum ActionTypes {
  SET_NODE_SOURCE = "[EntityState] Set node source",
  SET_WIRE_SOURCE = "[EntityState] Set wire source",
  SET_CELL_SHEET = "[EntityState] Set cell sheet",

  LOAD_EXAMPLE_DOCUMENT = "$ [EntityState] Load example document",
}

type Action =
  | SetNodeSourceAction
  | SetWireSourceAction
  | SetCellSheetAction
  | LoadExampleDocumentAction;

interface SetNodeSourceAction extends TypedAction<ActionTypes.SET_NODE_SOURCE> {
  payload: { nodeId: string; sourceId: string };
}

const setNodeSource = (nodeId: string, sourceId: string): Action => ({
  type: ActionTypes.SET_NODE_SOURCE,
  payload: { nodeId, sourceId },
});

interface SetWireSourceAction extends TypedAction<ActionTypes.SET_WIRE_SOURCE> {
  payload: { wireId: string; sourceId: string };
}

const setWireSource = (wireId: string, sourceId: string): Action => ({
  type: ActionTypes.SET_WIRE_SOURCE,
  payload: { wireId, sourceId },
});

interface SetCellSheetAction extends TypedAction<ActionTypes.SET_CELL_SHEET> {
  payload: { cellId: string; sheetId: string };
}

const setCellSheet = (cellId: string, sheetId: string): Action => ({
  type: ActionTypes.SET_CELL_SHEET,
  payload: { cellId, sheetId },
});

interface LoadExampleDocumentAction
  extends TypedAction<ActionTypes.LOAD_EXAMPLE_DOCUMENT> {}

const loadExampleDocument = (): Action => ({
  type: ActionTypes.LOAD_EXAMPLE_DOCUMENT,
});

export { ActionTypes, Action };
export { setNodeSource, setWireSource, setCellSheet, loadExampleDocument };
