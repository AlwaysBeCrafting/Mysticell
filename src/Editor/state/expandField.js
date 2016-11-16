export const EXPAND_FIELD = 'EXPAND_FIELD';

export const reducer = ( state = {}, action ) => {
	if ( action.type === EXPAND_FIELD ) return { ...state, [action.id]: true };
	return state;
};

export default id => ({ type: EXPAND_FIELD, id });
