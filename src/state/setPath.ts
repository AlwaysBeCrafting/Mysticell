import Action, { SetPathAction } from './action';

export const reducer = ( state: string[] = [], action: Action ) => {
	if ( action.type === 'SET_PATH' ) {
		return action.path;
	}
	return state;
};

export default ( path: string[] ): SetPathAction => ({ type: 'SET_PATH', path });
