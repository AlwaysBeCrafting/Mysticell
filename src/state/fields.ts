import { FieldState } from 'state';

export const fieldParent = ( id: number, fields: Map<number, FieldState> ): number | undefined => {
	const parent = Array.from( fields )
		.find( entry =>  !!entry[1].children
			.find( childId => childId === id ),
		);
	return parent && parent[0];
};

export const fieldPath = ( id: number, fields: Map<number, FieldState> ): string[] => {
	const parent = fieldParent( id, fields );
	const field = fields.get( id );
	return [
		...(( parent && fieldPath( parent, fields )) || [] ),
		...(( field && [field.name] ) || [] ),
	];
};
