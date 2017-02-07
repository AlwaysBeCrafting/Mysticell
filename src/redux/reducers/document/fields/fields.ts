import { fields } from "redux/actions/document/fields";

import { Field } from "data";

type FieldMap = Map<number, Field>;

export const reducer = ( state = new Map(), action: fields.Actions ): FieldMap => {
	switch ( action.type ) {

		case fields.ActionTypes.EXPAND_FIELD:
			const expandingField = state.get( action.payload.fieldId );
			if ( !expandingField ) { return state; }
			return new Map( state ).set( expandingField.id, { ...expandingField, expanded: true } );

		case fields.ActionTypes.COLLAPSE_FIELD:
			const collapsingField = state.get( action.payload.fieldId );
			if ( !collapsingField ) { return state; }
			return new Map( state ).set( collapsingField.id, { ...collapsingField, expanded: false } );

		default: return state;
	}
};
