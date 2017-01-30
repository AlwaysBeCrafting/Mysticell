import * as popup from "redux/actions/popup";
import { PopupState } from "redux/state";

const defaultState: PopupState = {
	position: { x: 0, y: 0 },
};

export const reducer = ( state = defaultState, action: popup.Actions ) => {
	switch ( action.type ) {
		case popup.ActionTypes.SHOW_POPUP:
			return { ...action.payload };

		case popup.ActionTypes.HIDE_POPUP:
			return defaultState;

		default: return state;
	}
};
