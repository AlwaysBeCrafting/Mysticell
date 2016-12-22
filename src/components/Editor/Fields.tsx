import * as React from 'react';
import { connect } from 'react-redux';

import AppState from 'state';
import Action from 'state/action';

import { collapseField } from 'state/reducers/expandedFields';
import { expandField   } from 'state/reducers/expandedFields';
import { setPath       } from 'state/reducers/path';

import Tree, { TreeItemData, TreeProps } from 'components/common/Tree';
import Doc, { DocUi, Field, FieldMap }  from 'data/doc';

import './Fields.less';

const icFormula = require<string>('./ic_formula.svg');

const mapFieldIdsToTreeItems = (
	ids: number[],
	fields: Map<number, Field>,
	expandedFields: Set<number>,
	path: string[] = [],
): TreeItemData[] => {
	return ids
		.map( id => fields.get( id ) as Field )
		.map( item => {
			const { id, name, children } = item;
			return {
				id,
				path:     [ ...path, name ],
				children: mapFieldIdsToTreeItems(
					children,
					fields,
					expandedFields,
					[ ...path, name ],
				),
				expanded: expandedFields.has( id ),
			};
		});
};

const mapStateToProps = ( state: AppState ) => ({
	items: mapFieldIdsToTreeItems( state.doc.rootFields, state.doc.fields, state.ui.expandedFields ),
});

const mapDispatchToProps = ( dispatch: (action: Action) => void ): Partial<TreeProps> => {
	return {
		onExpandItem:    ( item ) => dispatch( expandField(   item.id )),
		onCollapseItem:  ( item ) => dispatch( collapseField( item.id )),
		onCreateButtons: ( item ) => <button
			onClick={ ev => {
				dispatch( setPath( item.path ));
				ev.stopPropagation();
				} }>
			<img
				src={ icFormula }
				alt="formula" />
		</button>,
	};
};

export default connect<{}, {}, TreeProps>(
	mapStateToProps,
	mapDispatchToProps,
)( Tree );
