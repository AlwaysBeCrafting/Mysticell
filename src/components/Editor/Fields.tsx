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
	onExpandField: ( field: FieldState ) => () => void,
	onCollapseField: ( field: FieldState ) => () => void,
	onClickField: ( field: FieldState ) => void,
): TreeItem[] => ids
	.map( id => fields.get( id ) as FieldState )
	.map( field => ({
			id: field.id,
			name: field.name,
			isExpanded: field.expanded,

			children: inflateFieldsToTreeItems(
				field.children,
				fields,
				onExpandField,
				onCollapseField,
				onClickField,
			),

			onExpand: onExpandField( field ),
			onCollapse: onCollapseField( field ),
			buttons: [<button
					onClick={ ev => {
						onClickField( field );
						ev.stopPropagation();
					} }>
					<img
					src={ icFormula }
					alt="formula" />
				</button>],
	}));

interface StateProps {
	fields: Map<number, FieldState>;
}

const mapStateToProps = ( { fields }: AppState ): StateProps => ({
	fields,
});

interface DispatchProps {
	dispatch: ( action: Action ) => void;
}

const mapDispatchToProps = ( dispatch: ( action: Action ) => void ): DispatchProps => ({
	dispatch,
});

const mergeProps = ( { fields }: StateProps, { dispatch }: DispatchProps ): TreeProps => ({
	items: inflateFieldsToTreeItems(
			Array.from( fields )
				.filter(([ id, field ]) => !fieldParent( id, fields ))
				.map(([ id, field ]) => id ),
			fields,
			( field: FieldState ) => () => dispatch( expandField( field.id )),
			( field: FieldState ) => () => dispatch( collapseField( field.id )),
			( field: FieldState ) => {
				dispatch( setPathToFormula( field.id ));
			},
		),
});

export default reduxConnect<{}, {}, TreeProps>(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps,
)( Tree );
