import * as React from 'react';
import { connect as reduxConnect } from 'react-redux';

import AppState from 'state';
import Action from 'state/actions';

import collapseField from 'state/actions/collapseField';
import expandField from 'state/actions/expandField';
import setPath from 'state/actions/setPath';

import Tree, { TreeItem, TreeProps } from 'components/common/Tree';
import { FieldState } from 'state';

import './Fields.less';

//==============================================================================

const icFormula = require<string>('./ic_formula.svg');

const inflateFieldsToTreeItems = (
	ids: number[],
	fields: Map<number, FieldState>,
): TreeItem[] => ids
	.map( id => fields.get( id ) as FieldState )
	.map( field => ({
			id: field.id,
			name: field.name,
			children: inflateFieldsToTreeItems(
				field.children,
				fields,
			),
			expanded: field.expanded,
	}));

const mapStateToProps = ( state: AppState ): Partial<TreeProps> => ({
	items: inflateFieldsToTreeItems(
		Array.from( state.fields )
			.map(([ id, field ]) => id ),
		state.fields,
	),
});

const mapDispatchToProps = ( dispatch: ( action: Action ) => void ): Partial<TreeProps> => {
	return {
		onExpandItem:    ( item: TreeItem ) => dispatch( expandField(   item.id )),
		onCollapseItem:  ( item: TreeItem ) => dispatch( collapseField( item.id )),
		onCreateButtons: ( item: TreeItem ) => <button
			onClick={ ev => {
				dispatch( setPath( [] ));
				ev.stopPropagation();
				} }>
			<img
				src={ icFormula }
				alt="formula" />
		</button>,
	};
};

export default reduxConnect<{}, {}, TreeProps>(
	mapStateToProps,
	mapDispatchToProps,
)( Tree );
