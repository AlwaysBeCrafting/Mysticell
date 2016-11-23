export const ADD_NODE = 'ADD_NODE';

export const reducer = ( state = { fields: {}, nodes: {} }, { fieldId, fxn, type } ) => {
	const { fields, nodes } = state;
	
	if ( type === ADD_NODE && fields[fieldId] ) {
		const node = {
			fxn,
			label:      'Add',
			inputNodes: [],
			position:   { x: 0, y: 0 },
			_id:        Math.floor( Math.random() * 1000000 ),
		};
		
		const field = {
			...fields[fieldId],
			formula: {
				...fields[fieldId].formula,
				nodes: [
					...fields[fieldId].formula.nodes,
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

export default ( fieldId, fxn ) => ({ type: ADD_NODE, fieldId, fxn });
