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
	cardsById:  mapItems( doc.cards  ),
	sheetsById: mapItems( doc.sheets ),
	fieldsById: mapItems( doc.fields ),
	rootFields: doc.fields.map( field => field._id ),
});
