import { Anchor, Position } from "data/shared";


export class ActionTypes {
	static readonly SHOW_POPUP = "[Popup] Show";
	static readonly HIDE_POPUP = "[Popup] Hide";
}


export class ShowPopupAction {
	readonly type = ActionTypes.SHOW_POPUP;
	constructor ( public payload: { element: JSX.Element, position: Position, anchor?: Anchor }) {};
}
export const showPopup = ( element: JSX.Element, position: Position, anchor?: Anchor ): ShowPopupAction => ({
	...new ShowPopupAction({ element, position, anchor }),
});


export class HidePopupAction {
	readonly type = ActionTypes.HIDE_POPUP;
}
export const hidePopup = () => ({
	...new HidePopupAction(),
});


export type Actions = ShowPopupAction | HidePopupAction;
