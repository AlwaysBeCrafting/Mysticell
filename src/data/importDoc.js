const mapChildrenToIds = ( children = [] ) => children.map( child => child._id );

const mapItems = ( items = [] ) => items.reduce(
	( acc, item ) => ({
		...acc,
		[item._id]: { ...item, children: mapChildrenToIds( item.children ) },
		...mapItems( item.children ),
	}),
	{/* Start empty */},
);

export default doc => {
	const cards  = mapItems( doc.cards );
	const sheets = mapItems( doc.sheets );
	const fields = mapItems( doc.fields );
	
	const nodes = Object.keys( fields ).reduce(
		( acc, id ) => {
			(( fields[id].formula || {} ).nodes || [] ).forEach( node => {
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
		cards,
		sheets,
		fields,
		nodes,
		rootFields,
		visibleCards,
		visibleSheets,
	};
};
