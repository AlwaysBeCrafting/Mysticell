import Action, { ExpandFieldAction } from './action';

export const reducer = ( state: Set<number> = new Set(), action: Action ): Set<number> => {
	if ( action.type === 'EXPAND_FIELD' ) {
		const stateClone = new Set( state );
		stateClone.add( action.id );
		return stateClone;
	}
	return state;
};

export default ( id: number ): ExpandFieldAction => ({ type: 'EXPAND_FIELD', id });
