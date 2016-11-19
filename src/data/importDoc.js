const mapItems = ( items = [] ) => items.reduce(
	( acc, item ) => ({
		...acc,
		[item._id]: { ...item, children: ( item.children || [] ).map( child => child._id ) },
		...mapItems( item.children ),
	}),
	{/* Start empty */},
);

export default doc => ({
	...doc,
	cards:  mapItems( doc.cards  ),
	sheets: mapItems( doc.sheets ),
	fields: mapItems( doc.fields ),
});
