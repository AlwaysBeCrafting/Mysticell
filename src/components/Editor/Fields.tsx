import * as  React from 'react';
import { connect } from 'react-redux';

import Action 		 from 'state/action';
import collapseField from 'state/collapseField';
import expandField   from 'state/expandField';
import setPath       from 'state/setPath';

import Tree, { TreeItemData, TreeProps } from 'components/common/Tree';
import Doc, { DocUI, Field, FieldMap }  from 'data/doc';

import './Fields.less';

const icFormula = require<string>('./ic_formula.svg');

const mapFieldIdsToTreeItems = (
	ids: number[],
	fields: FieldMap,
	expandedFields: Set<number>,
	path: string[] = [],
): TreeItemData[] => {
	return ids.map( id => fields.get( id ) as Field )
		.map( item => {
			const { _id, name, children } = item;
			return {
				id:       _id,
				path:     [ ...path, name ],
				children: mapFieldIdsToTreeItems(
					children,
					fields,
					expandedFields,
					[ ...path, name ],
				),
				expanded: expandedFields.has( _id ),
			};
		});
};

const mapStateToProps = ( state: { doc: Doc, ui: DocUI } ) => {
	return {
		items: mapFieldIdsToTreeItems( state.doc.rootFields, state.doc.fields, state.ui.expandedFields ),
	};
};

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
