import AppState, { NodeState } from 'state';
import Action from 'state/action';

import { Anchor, Position } from 'data/shared';

export interface HidePopupAction {
	type: 'HIDE_POPUP';
}

export const reducer = ( state: AppState, action: Action ): AppState => {
	if ( action.type !== 'HIDE_POPUP' ) { return state; }

	const clonedState = { ...state };
	delete clonedState.popup;
	return clonedState;
};

export default (): HidePopupAction => ({ type: 'HIDE_POPUP' });
