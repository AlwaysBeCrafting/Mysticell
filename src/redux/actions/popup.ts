import { Anchor, Position } from "data/shared";

export class ActionTypes {
	static readonly SHOW_POPUP = "[Popup] Show";
	static readonly HIDE_POPUP = "[Popup] Hide";
}

export class ShowPopupAction {
	type = ActionTypes.SHOW_POPUP;
	payload: { element: JSX.Element, position: Position, anchor?: Anchor };
}
export const showPopup = ( element: JSX.Element, position: Position, anchor?: Anchor ): ShowPopupAction => ({
	type: ActionTypes.SHOW_POPUP,
	payload: { element, position, anchor },
});


export class HidePopupAction {
	type = ActionTypes.HIDE_POPUP;
}
export const hidePopup = () => ({
	type: ActionTypes.HIDE_POPUP,
});


export type Actions = ShowPopupAction | HidePopupAction;
