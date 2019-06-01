import { Map, Set } from "immutable";
import { ReducersMapObject } from "redux";

import { EntityTable } from "~/data/common";
import {
  Action as CellAction,
  ActionTypes as SourceActionTypes,
} from "~/data/Cell";

import { Action, ActionTypes } from "./actions";
import { Sheet } from "./model";

const reducers: ReducersMapObject = {
  sheets: (state = new EntityTable<Sheet>(), action: Action) => {
    switch (action.type) {
      case ActionTypes.INSERT: {
        const { sheet } = action.payload;
        return state.putEntity(sheet);
      }
      default:
        return state;
    }
  },
  sheetCells: (state: Map<string, Set<string>> = Map(), action: CellAction) => {
    switch (action.type) {
      case SourceActionTypes.INSERT: {
        const { id, sheetId } = action.payload.cell;
        return state.update(sheetId, Set(), sheets => sheets.add(id));
      }
      default:
        return state;
    }
  },
};

export { reducers };
