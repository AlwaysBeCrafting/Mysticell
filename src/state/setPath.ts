import Action from './action';

export const reducer = ( state = [], action: Action ) => {
	if ( action.type === 'SET_PATH' ) {
		return action.path;
	}
	return state;
};

export default (path: string[]) => ({ type: 'SET_PATH', path });
