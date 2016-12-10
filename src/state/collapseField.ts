import Action, { CollapseFieldAction } from './action';

export const reducer = ( state: Set<number> = new Set(), action: Action ): Set<number> => {
	if ( action.type === 'COLLAPSE_FIELD' ) {
		const stateClone = new Set( state );
		stateClone.delete( action.id );
		return stateClone;
	}
	return state;
};

export default ( id: number ): CollapseFieldAction => ({ type: 'COLLAPSE_FIELD', id });
