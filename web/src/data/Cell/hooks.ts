import { List } from "immutable";
import { useSelector } from "react-redux";

import { App } from "~/data/App";
import { Cell } from "~/data/Cell";

const useCellList = (sheetId: string) => {
  const cells = useSelector(
    (state: App) => state.sheetCells.get(sheetId, List<string>()),
    [sheetId],
  );
  const actions = {};
  return [cells, actions] as const;
};

const useCell = (cellId: string) => {
  const cell = useSelector(
    (state: App) => state.cells.getEntity(cellId, new Cell()),
    [cellId],
  );
  const actions = {};
  return [cell, actions] as const;
};

export { useCellList, useCell };
