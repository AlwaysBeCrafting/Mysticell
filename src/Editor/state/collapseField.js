export const COLLAPSE_FIELD = 'COLLAPSE_FIELD';

export const reducer = ( state = {}, action ) => {
	if ( action.type === COLLAPSE_FIELD ) return { ...state, [action.id]: undefined };
	return state;
};

export default id => ({ type: COLLAPSE_FIELD, id });
