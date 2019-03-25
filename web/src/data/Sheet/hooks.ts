import { tuple, useStore } from "common/utils";
import { App } from "data/App";

const useSheetList = (documentId: string) => {
  const [state] = useStore<App>();
  return tuple(
    state.documentSheets
      .getRelated(documentId)
      .map(sheetId => state.sheets.getEntity(sheetId)),
    {},
  );
};

const useSheet = (sheetId: string) => {
  const [state] = useStore<App>();
  return tuple(state.sheets.getEntity(sheetId), {});
};

export { useSheetList, useSheet };
