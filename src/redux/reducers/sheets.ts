import * as cards from "redux/actions/cards";
import { CardState } from "redux/state";

const initialState: Map<number, CardState> = new Map();

export const reducer = (
	state = initialState,
	action: cards.Actions,
): Map<number, CardState> => state;
