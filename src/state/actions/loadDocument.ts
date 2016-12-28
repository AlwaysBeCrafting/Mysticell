import AppState from 'state';
import Action from 'state/actions';

import DocJson, { FieldJson, FormulaJson, NodeJson } from 'data/docJson';

//==============================================================================

export interface LoadDocumentAction {
	type: 'LOAD_DOCUMENT';
	docJson: DocJson;
}

//------------------------------------------------------------------------------

export const reducer = ( state: AppState, action: Action ): AppState => {
	if ( action.type !== 'LOAD_DOCUMENT' ) { return state; }

	const { docJson } = action;

	const flattenFields = (
		fields: FieldJson[],
	): FieldJson[] => fields.reduce(
		( acc, field ) => [ ...acc, field, ...flattenFields( field.children )],
		[] as FieldJson[],
	);
	const flatFields: FieldJson[] = flattenFields( docJson.fields );

	const arrayToIdMap = <T extends { id: number }>(
		array: T[]
	): Map<number, T> => array.reduce(
		( acc, item ) => acc.set( item.id, item ),
		new Map(),
	);

	return {
		title: docJson.title,
		path: [],

		fields: arrayToIdMap( flatFields
			.map( fieldJson => ({
				id: fieldJson.id,
				name: fieldJson.name,
				children: fieldJson.children.map( child => child.id ),
				expanded: false,
			})),
		),
		formulas: arrayToIdMap( flatFields
			.filter( fieldJson => fieldJson.formula )
			.map( fieldJson => ({
				id: fieldJson.id,
				resultNode: 0,
				nodes: ( fieldJson.formula || { nodes: [] as NodeJson[] }).nodes.map( node => node.id ),
			})),
		),
		nodes: arrayToIdMap( flatFields
			.filter( fieldJson => fieldJson.formula )
			.map( fieldJson => fieldJson.formula )
			.reduce(
				( acc, formula ) => [
					...acc,
					...( formula || { nodes: [] as NodeJson[] }).nodes.map( nodeJson => ({
						id: nodeJson.id,
						label: nodeJson.label,
						fxn: nodeJson.fxn,
						inputNodes: nodeJson.inputNodes.filter( input => input !== null ),
						position: nodeJson.position,
					})),
				],
				[] as NodeJson[],
			),
		),

		sheets: arrayToIdMap( docJson.sheets
			.map( sheetJson => ({
				id: sheetJson.id,
				title: sheetJson.title,
				cells: new Set( sheetJson.cells.map( cell => cell.id )),
				isVisible: true,
			})),
		),
		cards: arrayToIdMap( docJson.cards
			.map( cardJson => ({
				id: cardJson.id,
				title: cardJson.title,
				cells: new Set( cardJson.cells.map( cell => cell.id )),
				isVisible: true,
			})),
		),
		cells: arrayToIdMap([ ...docJson.sheets, ...docJson.cards ]
			.map( sheetOrCard => sheetOrCard.cells )
			.reduce(
				( acc, cells ) => [ ...acc, ...cells ],
				[],
			)
			.map( cellJson => ({
				id: cellJson.id,
				field: cellJson.field,
				start: cellJson.start,
				end: cellJson.end,
			})),
		),
	};
};

//------------------------------------------------------------------------------

export default ( docJson: DocJson ): LoadDocumentAction => ({
	type: 'LOAD_DOCUMENT',
	docJson,
});
