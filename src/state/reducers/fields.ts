import Action, {
	AddNodeAction,
	CollapseFieldAction,
	ExpandFieldAction,
} from 'state/action';

import { FieldState } from 'state';

export default ( fields: Map<number, FieldState> = new Map(), action: Action ): Map<number, FieldState> => {

	if ( action.type !== 'EXPAND_FIELD' && action.type !== 'COLLAPSE_FIELD' ) {
		return fields;
	}

	const field = fields.get( action.fieldId );

	if ( !field ) { return fields; };

	switch ( action.type ) {

		case 'EXPAND_FIELD':
			return new Map( fields ).set(
				action.fieldId,
				{
					...fields.get( action.fieldId ),
					expanded: true,
				},
			);


		case 'COLLAPSE_FIELD':
			return new Map( fields ).set(
				action.fieldId,
				{
					...fields.get( action.fieldId ),
					expanded: false,
				},
			);


		default: return fields;
	}
};

export const expandField   = ( fieldId: number ): ExpandFieldAction   => ({ type: 'EXPAND_FIELD',   fieldId });
export const collapseField = ( fieldId: number ): CollapseFieldAction => ({ type: 'COLLAPSE_FIELD', fieldId });
