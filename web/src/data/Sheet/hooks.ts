import { useStore } from "data/store";
import { tuple } from "common/utils";

const useSheetList = (documentId: string) => {
  const [state] = useStore();
  return tuple(
    state.documentSheets
      .getRelated(documentId)
      .map(sheetId => state.sheets.getEntity(sheetId)),
    {},
  );
};

const useSheet = (sheetId: string) => {
  const [state] = useStore();
  return tuple(state.sheets.getEntity(sheetId), {});
};

export { useSheetList, useSheet };
