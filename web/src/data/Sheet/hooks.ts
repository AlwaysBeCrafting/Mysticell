import { List } from "immutable";
import { useSelector } from "react-redux";

import { App } from "data/App";
import { Sheet } from "data/Sheet";

const useSheetList = (documentId: string) => {
  const sheets = useSelector(
    (state: App) => state.documentSheets.get(documentId, List<string>()),
    [documentId],
  );
  const actions = {};
  return [sheets, actions] as const;
};

const useSheet = (sheetId: string) => {
  const sheet = useSelector(
    (state: App) => state.sheets.getEntity(sheetId, new Sheet()),
    [sheetId],
  );
  const actions = {};
  return [sheet, actions] as const;
};

export { useSheetList, useSheet };
