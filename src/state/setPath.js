export const SET_PATH = 'SET_PATH';

export const reducer = ( state = [], action ) => {
	if ( action.type === SET_PATH ) return action.path;
	return state;
};

export default path => ({ type: SET_PATH, path });
