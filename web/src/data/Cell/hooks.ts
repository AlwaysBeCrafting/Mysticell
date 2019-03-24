import { useStore } from "data/store";

const useCellList = (sheetId: string) => {
  const [state] = useStore();
  return [state.sheetCells.getRelated(sheetId), {}];
};

const useCell = (cellId: string) => {
  const [state] = useStore();
  return [state.cells.getEntity(cellId), {}];
};

export { useCellList, useCell };
