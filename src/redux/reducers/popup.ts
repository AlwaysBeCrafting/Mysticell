import { Anchor, Position } from "data/shared";

import * as popup from "redux/actions/popup";

export interface PopupState {
	element?: JSX.Element;
	position: Position;
	anchor?: Anchor;
}

const defaultState: PopupState = {
	position: { x: 0, y: 0 },
};

export const reducer = ( state = defaultState, action: popup.Actions ): PopupState => {
	switch ( action.type ) {
		case popup.ActionTypes.SHOW_POPUP:
			return { ...action.payload };

		case popup.ActionTypes.HIDE_POPUP:
			return defaultState;

		default: return state;
	}
};
