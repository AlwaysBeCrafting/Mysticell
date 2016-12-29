import * as React from 'react';
import { connect as reduxConnect } from 'react-redux';

import AppState from 'state';
import Action from 'state/action';
import { fieldParent } from 'state/field';

import collapseField from 'state/action/collapseField';
import expandField from 'state/action/expandField';
import setPathToFormula from 'state/action/setPathToFormula';

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

const mapStateToProps = ( state: AppState ): TreeProps => ({
	items: inflateFieldsToTreeItems(
		Array.from( state.fields )
			.filter(([ id, field ]) => !fieldParent( id, state.fields ))
			.map(([ id, field ]) => id ),
		state.fields,
	),
});

const mapDispatchToProps = ( dispatch: ( action: Action ) => void ): Partial<TreeProps> => ({
	onExpandItem:    ( item: TreeItem ) => dispatch( expandField(   item.id )),
	onCollapseItem:  ( item: TreeItem ) => dispatch( collapseField( item.id )),
	onCreateButtons: ( item: TreeItem ) => <button
		onClick={ ev => {
			dispatch( setPathToFormula( item.id ));
			ev.stopPropagation();
			} }>
		<img
			src={ icFormula }
			alt="formula" />
	</button>,
});

export default reduxConnect<{}, {}, TreeProps>(
	mapStateToProps,
	mapDispatchToProps,
)( Tree );
