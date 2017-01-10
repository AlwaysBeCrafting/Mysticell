import AppState, { NodeState } from 'state';
import Action from 'state/action';

import { Anchor, Position } from 'data/shared';

export interface ShowPopupAction {
	type: 'SHOW_POPUP';
	element: JSX.Element;
	position: Position;
	anchor?: Anchor;
}

export const reducer = ( state: AppState, action: Action ): AppState => {
	if ( action.type !== 'SHOW_POPUP' ) { return state; }

	return {
		...state,
		popup: {
			...action,
		},
	};
};

export default (
	element: JSX.Element,
	position: Position,
	anchor?: Anchor,
): ShowPopupAction => ({
	type: 'SHOW_POPUP',
	element,
	position,
	anchor,
});
