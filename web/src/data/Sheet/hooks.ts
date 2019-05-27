import { List } from "immutable";
import { useSelector, useDispatch } from "react-redux";

import { App } from "~/data/App";
import { clientRequest } from "~/data/client";
import { Sheet } from "~/data/Sheet";

import { ActionTypes } from "./actions";

const useSheetList = (documentId: string) => {
  const sheets = useSelector(
    (state: App) => state.documentSheets.get(documentId, List<string>()),
    [documentId],
  );
  const dispatch = useDispatch();
  const actions = {
    fetch: () =>
      dispatch(
        clientRequest(
          ActionTypes.LIST,
          "GET",
          `documents/${documentId}/sheets`,
        ),
      ),
    insert: (sheet: Sheet) =>
      dispatch({
        type: ActionTypes.INSERT,
        payload: { sheet },
      }),
  };
  return [sheets, actions] as const;
};

const useSheet = (sheetId: string) => {
  const sheet = useSelector(
    (state: App) => state.sheets.getEntity(sheetId, new Sheet()),
    [sheetId],
  );
  const dispatch = useDispatch();
  const actions = {
    fetch: (documentId: string, sheetId: string) =>
      dispatch(
        clientRequest(
          ActionTypes.GET,
          "GET",
          `documents/${documentId}/sheets/${sheetId}`,
        ),
      ),
  };
  return [sheet, actions] as const;
};

export { useSheetList, useSheet };
