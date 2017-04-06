import { Anchor } from 'common/types';


export class ActionTypes {
	static readonly SHOW_POPUP = '[Popup] Show';
	static readonly HIDE_POPUP = '[Popup] Hide';
}


class ShowPopupAction {
	readonly type = ActionTypes.SHOW_POPUP;
	constructor( public payload: { element: JSX.Element, position: Position, anchor?: Anchor }) {}
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

export default Action;