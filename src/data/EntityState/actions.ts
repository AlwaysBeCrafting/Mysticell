import { TypedAction } from "data/common";

const enum ActionTypes {
  SET_DIRECTORY_DOCUMENT = "[EntityState] Set directory document",
  SET_SOURCE_DOCUMENT = "[EntityState] Set source document",
  SET_ENTITY_PARENT = "[EntityState] Set entity parent",
  SET_NODE_SOURCE = "[EntityState] Set node source",
  SET_WIRE_SOURCE = "[EntityState] Set wire source",
  SET_CELL_SHEET = "[EntityState] Set cell sheet",

  LOAD_EXAMPLE_DOCUMENT = "$ [EntityState] Load example document",
}

type Action =
  | SetDirectoryDocumentAction
  | SetSourceDocumentAction
  | SetEntityParentAction
  | SetNodeSourceAction
  | SetWireSourceAction
  | SetCellSheetAction
  | LoadExampleDocumentAction;

interface SetDirectoryDocumentAction
  extends TypedAction<ActionTypes.SET_DIRECTORY_DOCUMENT> {
  payload: { directoryId: string; documentId: string };
}

const setDirectoryDocument = (
  directoryId: string,
  documentId: string,
): Action => ({
  type: ActionTypes.SET_DIRECTORY_DOCUMENT,
  payload: { directoryId, documentId },
});

interface SetSourceDocumentAction
  extends TypedAction<ActionTypes.SET_SOURCE_DOCUMENT> {
  payload: { sourceId: string; documentId: string };
}

const setSourceDocument = (sourceId: string, documentId: string): Action => ({
  type: ActionTypes.SET_SOURCE_DOCUMENT,
  payload: { sourceId, documentId },
});

interface SetEntityParentAction
  extends TypedAction<ActionTypes.SET_ENTITY_PARENT> {
  payload: { entityId: string; parentId: string };
}

const setEntityParent = (entityId: string, parentId: string): Action => ({
  type: ActionTypes.SET_ENTITY_PARENT,
  payload: { entityId, parentId },
});

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
export {
  setDirectoryDocument,
  setSourceDocument,
  setEntityParent,
  setNodeSource,
  setWireSource,
  setCellSheet,
  loadExampleDocument,
};
