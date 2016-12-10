import Doc, { Field, FieldMap, Node, NodeMap } from 'data/doc';

import Action, { AddNodeAction } from './action';

export const reducer = ( state: Doc, action: Action ): Doc => {
	if ( action.type === 'ADD_NODE' && state.fields.get( action.fieldId )) {

		const field = state.fields.get( action.fieldId );

		if ( !field ) { return state; }
		const node: Node = {
			_id:        Math.floor( Math.random() * 1000000 ),
			fxn: action.fxn,
			inputNodes: [],
			label:      'Add',
			position:   { x: 0, y: 0 },
		};

		// TODO: This is gross, fix it. Don't show chat.
		const fieldClone: Field = {
			...field,
			formula: {             // Oh god
				...field.formula,
				nodes: [           // Oh god why
					...( field.formula || { nodes: new Array<number>() }).nodes,
					node._id,
				],
			},
		};

		return {
			...state,
			fields: new Map( state.fields ).set( action.fieldId, fieldClone ),
			nodes:  new Map( state.nodes  ).set( node._id,       node       ),
		};
	}
	return state;
};

export default ( fieldId: number, fxn: string ): AddNodeAction => ({ type: 'ADD_NODE', fieldId, fxn });
