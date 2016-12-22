import { Field, Formula } from 'data/doc';
import Action, {
	AddNodeAction,
	CollapseFieldAction,
	ExpandFieldAction,
} from 'state/action';

export default ( fields: Map<number, Field> = new Map(), action: Action ): Map<number, Field> => {

	if (
		action.type !== 'ADD_NODE'     &&
		action.type !== 'EXPAND_FIELD' &&
		action.type !== 'COLLAPSE_FIELD'
	) {
		return fields;
	}

	const field = fields.get( action.fieldId );

	if ( !field ) { return fields; };

	switch ( action.type ) {

		case 'ADD_NODE':
			const formula: Formula = {
				...field.formula,
				nodes: [
					...( field.formula || { nodes: new Array<number>() }).nodes,
					action.nodeId,
				],
			};

			return new Map( fields ).set( action.fieldId, {
				...field,
				formula,
			} );


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
export const addNode = ( fieldId: number, nodeId: number, fxn: string ): AddNodeAction => ({
	type: 'ADD_NODE',
	fieldId,
	nodeId,
	fxn,
});
