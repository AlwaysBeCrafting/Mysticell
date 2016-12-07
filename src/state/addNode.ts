import {FieldMap, NodeMap} from 'data/doc';

import Action from './action';

export const reducer = ( state: { fields: FieldMap, nodes: NodeMap }, action: Action ) => {
	const { fields, nodes } = state;

	if ( action.type === 'ADD_NODE' && fields[action.fieldId] ) {
		const node = {
			_id:        Math.floor( Math.random() * 1000000 ),
			fxn: action.fxn,
			inputNodes: [],
			label:      'Add',
			position:   { x: 0, y: 0 },
		};

		const field = {
			...fields[action.fieldId],
			formula: {
				...fields[action.fieldId].formula,
				nodes: [
					...(fields[action.fieldId].formula || { nodes: new Array<number>()}).nodes,
					node._id,
				],
			},
		};

		return {
			...state,
			fields: { ...fields, [field._id]: field },
			nodes:  { ...nodes, [node._id]: node },
		};
	}
	return state;
};

export default ( fieldId: number, fxn: string ) => ({ type: 'ADD_NODE', fieldId, fxn });
