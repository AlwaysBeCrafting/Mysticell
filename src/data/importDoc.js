const mapId = ( items = [] ) => items.reduce(
	( acc, item ) => ({
		...acc,
		[item._id]: item,
	}),
	{},
);

const flatten = ( items = [] ) => items.reduce(
	( acc, item ) => [
		...acc,
		item,
		...flatten( item.children ),
	],
	[],
);

export default doc => {
	const fields = flatten( doc.fields );
	const nodeMappedFields = fields.map( field => ({
		...field,
		formula: {
			...field.formula,
			nodes: ( field.formula ? field.formula.nodes : [] ).map( node => node._id ),
		},
		children: field.children.map( child => child._id ),
	}));
	
	const nodes = fields.reduce(
		( acc, field ) => {
			(( field.formula || {} ).nodes || [] ).forEach( node => {
				acc[node._id] = node;
			});
			return acc;
		},
		{/* Start empty */},
	);
	
	const rootFields = doc.fields.map( field => field._id );
	const visibleCards = doc.cards.map( card => card._id );
	const visibleSheets = doc.sheets.map( sheet => sheet._id );
	
	return {
		...doc,
		
		cards:  mapId( doc.cards ),
		sheets: mapId( doc.sheets ),
		fields: mapId( nodeMappedFields ),
		nodes,
		rootFields,
		visibleCards,
		visibleSheets,
	};
};
