import Action, { CollapseFieldAction, ExpandFieldAction } from 'state/action';

const reduceExpandField = ( expandedFields: Set<number> = new Set(), action: Action ): Set<number> => {
	if ( action.type === 'EXPAND_FIELD' ) {
		const stateClone = new Set( expandedFields );
		stateClone.add( action.id );
		return stateClone;
	}
	return expandedFields;
};

const reduceCollapseField = ( expandedFields: Set<number> = new Set(), action: Action ): Set<number> => {
	if ( action.type === 'COLLAPSE_FIELD' ) {
		const stateClone = new Set( expandedFields );
		stateClone.delete( action.id );
		return stateClone;
	}
	return expandedFields;
};


export const expandField   = ( id: number ): ExpandFieldAction   => ({ type: 'EXPAND_FIELD',   id });
export const collapseField = ( id: number ): CollapseFieldAction => ({ type: 'COLLAPSE_FIELD', id });

const reducerList = [
	reduceExpandField,
	reduceCollapseField,
];

export default ( expandedFields: Set<number> = new Set(), action: Action ): Set<number> => {
	return reducerList.reduce(
		( acc, reducer ) => reducer( expandedFields, action ),
		expandedFields );
};
