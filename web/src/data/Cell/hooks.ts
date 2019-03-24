import { useStore } from "data/store";
import { tuple } from "common/utils";

const useCellList = (sheetId: string) => {
  const [state] = useStore();
  return tuple(
    state.sheetCells
      .getRelated(sheetId)
      .map(cellId => state.cells.getEntity(cellId)),
    {},
  );
};

const useCell = (cellId: string) => {
  const [state] = useStore();
  return tuple(state.cells.getEntity(cellId), {});
};

export { useCellList, useCell };
