import Action from 'state/action';

export default ( title: string = 'Title', action: Action ) => {
	if ( action.type === 'SET_TITLE' ) { return action.title || title; }
	return title;
};

export const setTitle = ( title: string ) => ({ type: 'SET_TITLE', title });
