import AppState from 'state';
import Action from 'state/action';

export interface SetTitleAction {
	type: 'SET_TITLE';
	title: string;
}

export const reducer = ( state: AppState, action: Action ): AppState => {
	if ( action.type !== 'SET_TITLE' ) { return state; }

	return {
		...state,
		title: action.title,
	};
};

export default ( title: string ) => ({
	type: 'SET_TITLE',
	title,
});
