import { Anchor, Position } from "common/types/layout";


export interface PopupState {
	element?: JSX.Element;
	position: Position;
	anchor?: Anchor;
}


class ActionTypes {
	static readonly SHOW_POPUP = "[Popup] Show";
	static readonly HIDE_POPUP = "[Popup] Hide";
}


class ShowPopupAction {
	readonly type = ActionTypes.SHOW_POPUP;
	constructor ( public payload: { element: JSX.Element, position: Position, anchor?: Anchor }) {};
}
export const showPopup = ( element: JSX.Element, position: Position, anchor?: Anchor ): ShowPopupAction => ({
	...new ShowPopupAction({ element, position, anchor }),
});


class HidePopupAction {
	readonly type = ActionTypes.HIDE_POPUP;
}
export const hidePopup = () => ({
	...new HidePopupAction(),
});


export type Action = ShowPopupAction | HidePopupAction;


const defaultState = { position: { x: 0, y: 0 }};
export default ( state = defaultState, action: Action ): PopupState => {
	switch ( action.type ) {
		case ActionTypes.SHOW_POPUP:
			return { ...action.payload };

		case ActionTypes.HIDE_POPUP:
			return defaultState;

		default: return state;
	}
};
