import UiState from './model';
import Action, { ActionTypes } from './actions';

export default ( state: UiState, action: Action ): UiState => {
	switch ( action.type ) {
		case ActionTypes.SHOW_POPUP:
			return state;

		case ActionTypes.HIDE_POPUP:
			return state;

		default: return state;
	}
};
