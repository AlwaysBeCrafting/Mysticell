import Action from './action';

export const reducer = ( state = {}, action: Action ) => {
	if ( action.type === 'EXPAND_FIELD' ) {
		return { ...state, [action.id]: true };
	}
	return state;
};

export default (id: number) => ({ type: 'EXPAND_FIELD', id });
