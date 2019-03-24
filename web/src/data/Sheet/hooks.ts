import { useStore } from "data/store";

const useSheetList = (documentId: string) => {
  const [state] = useStore();
  return [state.documentSheets.getRelated(documentId), {}];
};

const useSheet = (sheetId: string) => {
  const [state] = useStore();
  return [state.sheets.getEntity(sheetId), {}];
};

export { useSheetList, useSheet };
