import { tuple, useStore } from "common/utils";
import { App } from "data/App";

const useCellList = (sheetId: string) => {
  const [state] = useStore<App>();
  return tuple(
    state.sheetCells
      .getRelated(sheetId)
      .map(cellId => state.cells.getEntity(cellId)),
    {},
  );
};

const useCell = (cellId: string) => {
  const [state] = useStore<App>();
  return tuple(state.cells.getEntity(cellId), {});
};

export { useCellList, useCell };
