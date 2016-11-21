const mapChildrenToIds = ( children = [] ) => children.map( child => child._id );

const mapItems = ( items = [] ) => items.reduce(
	( acc, item ) => ({
		...acc,
		[item._id]: { ...item, children: mapChildrenToIds( item.children ) },
		...mapItems( item.children ),
	}),
	{/* Start empty */},
);

export default doc => ({
	...doc,
	cards:         mapItems( doc.cards  ),
	sheets:        mapItems( doc.sheets ),
	fields:        mapItems( doc.fields ),
	rootFields:    doc.fields.map( field => field._id ),
	visibleCards:  doc.cards.map(  card  => card._id  ),
	visibleSheets: doc.sheets.map( sheet => sheet._id ),
});
