import { Field, Formula } from 'data/doc';
import Action, { AddNodeAction } from 'state/action';

export default ( fields: Map<number, Field> = new Map(), action: Action ): Map<number, Field> => {
	if ( action.type === 'ADD_NODE' ) {

		const field = fields.get( action.fieldId );

		if ( !field ) { return fields; }

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
	}
	return fields;
};

export const addNode = ( fieldId: number, nodeId: number, fxn: string ): AddNodeAction => ({
	type: 'ADD_NODE',
	fieldId,
	nodeId,
	fxn,
});
