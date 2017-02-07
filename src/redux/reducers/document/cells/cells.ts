import { Cell } from "data";

import { cells } from "redux/actions/document/cells";

type CellMap = Map<number, Cell>;

export const reducer = ( state = new Map(), action: cells.Actions ): CellMap => state;
