import Doc, { Card, Field, IdMapped, Node, NodeMap, Sheet } from './doc';
import DocJSON, { NodeJSON } from './docJson';
import { Id } from './shared';

function mapId<T extends Id>(items: T[]): IdMapped<T> {
	return items.reduce(( acc: IdMapped<T>, item ) => {
		return {
			...acc,
			[item._id]: item,
		};
	}, {} as IdMapped<T>);
}

export function flatten<T extends { children: T[] }>( items: T[] ): T[] {
	return items.reduce(( acc, item ) => [
		...acc,
		item,
		...flatten( item.children ),
	], new Array<T>());
}

export default (doc: DocJSON): Doc => {
	const fields = flatten( doc.fields );
	const nodeMappedFields: Field[] = fields.map(field => ({
		...field,
		formula: {
			...field.formula,
			nodes: ( field.formula || { nodes: [] as NodeJSON[] }).nodes.map( node => node._id ),
		},
		children: field.children.map( child => child._id ),
	}));

	const nodes = fields.reduce(
		( acc, field ) => {
			(( field.formula || { nodes: [] as NodeJSON[] } ).nodes ).forEach(node => {
				acc[node._id] = node;
			});
			return acc;
		}, {} as NodeMap,
	);

	const rootFields = doc.fields.map( field => field._id );
	const visibleCards = doc.cards.map( card => card._id );
	const visibleSheets = doc.sheets.map( sheet => sheet._id );

	return {
		...doc,
		cards:  mapId( doc.cards as Card[] ),
		sheets: mapId( doc.sheets as Sheet[] ),
		fields: mapId( nodeMappedFields ),
		nodes,
		rootFields,
		visibleCards,
		visibleSheets,
	};
};
