import * as cards from "redux/actions/cards";
import { SheetState } from "redux/state";

const initialState: Map<number, SheetState> = new Map();

export const reducer = (
	state = initialState,
	action: cards.Actions,
): Map<number, SheetState> => state;
