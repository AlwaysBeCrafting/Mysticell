import Action from './actions';
import UiState from './model';


const defaultState = {};


export default ( state: UiState = defaultState, action: Action ): UiState => {
	switch ( action.type ) {
		default: return state;
	}
};
