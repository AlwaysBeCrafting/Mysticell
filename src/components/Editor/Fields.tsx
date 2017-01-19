import * as React from "react";
import { connect as reduxConnect } from "react-redux";

import { AppState } from "redux/state";

import { Action } from "redux/actions";
import { collapseField, expandField } from "redux/actions/fields";
import { setPath } from "redux/actions/path";

import Tree, { TreeItem, TreeProps } from "components/common/Tree";
import { FieldState } from "redux/state";

import "./Fields.less";

//==============================================================================


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


const icFormula = require<string>("./ic_formula.svg");

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
					key={ field.id }
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
				dispatch( setPath( fieldPath( field.id, fields )));
			},
		),
});

export default reduxConnect<{}, {}, TreeProps>(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps,
)( Tree );
