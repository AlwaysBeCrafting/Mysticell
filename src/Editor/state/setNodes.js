export const SET_NODES = 'SET_NODES';

export const reducer = ( state = {}, action ) => {
	if ( action.type === SET_NODES ) {
		return { ...state, [action.id]: action.nodes };
	}
	return state;
};

export default ( id, nodes ) => ({ type: SET_NODES, id, nodes });
