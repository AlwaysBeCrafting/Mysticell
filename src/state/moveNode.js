export const MOVE_NODE = 'MOVE_NODE';

export const reducer = ( state = [], action ) => {
	if ( action.type === MOVE_NODE ) return action.path;
	return state;
};

export default path => ({ type: MOVE_NODE, path });
