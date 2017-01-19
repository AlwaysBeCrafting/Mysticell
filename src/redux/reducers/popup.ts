import * as popup from "redux/actions/popup";
import { PopupState } from "redux/state";

const initialState = {
	element: null,
	position: { x: 0, y: 0 },
};

export const reducer = (
	state = initialState,
	action: popup.Actions,
): PopupState | {} => state;
