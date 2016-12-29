import AppState from 'state';
import Action from 'state/action';

export interface SetPathAction {
	type: 'SET_PATH';
	path: string[];
}

export const reducer = ( state: AppState, action: Action ): AppState => {
	if ( action.type !== 'SET_PATH' ) { return state; }

	return {
		...state,
		path: action.path,
	};
};

export default ( path: string[] ): SetPathAction => ({
	type: 'SET_PATH',
	path,
});
