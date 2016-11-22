export const MOVE_NODE = 'MOVE_NODE';

export const reducer = ( state = {}, { type, id, position } ) => {
	if ( type === MOVE_NODE && state[id] ) {
		return { ...state, [id]: { ...state[id], position } };
	}
	return state;
};

export default ( id, position ) => ({ type: MOVE_NODE, id, position });
