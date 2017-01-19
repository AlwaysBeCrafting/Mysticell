import * as fields from "redux/actions/fields";
import { FieldState } from "redux/state";

const initialState: Map<number, FieldState> = new Map();

export const reducer = (
	state = initialState,
	action: fields.Actions,
): Map<number, FieldState> => state;
