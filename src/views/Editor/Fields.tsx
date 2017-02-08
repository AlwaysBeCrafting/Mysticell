import * as React from "react";
import { connect as reduxConnect } from "react-redux";

import { Field } from "common/types";

import { Action, AppState } from "data";
import { collapseField, expandField } from "data/document/fields/collection";
import { setPath } from "data/path";

import Tree, { TreeItemData, TreeProps } from "common/components/Tree";

import "./Fields.less";

//==============================================================================


export const fieldParent = ( id: number, fields: Map<number, Field> ): number | undefined => {
	const parent = Array.from( fields )
		.find( entry =>  !!entry[1].children
			.find( childId => childId === id ),
		);
	return parent && parent[0];
};

export const fieldPath = ( id: number, fields: Map<number, Field> ): string[] => {
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
	fields: Map<number, Field>,
	onExpandField: ( field: Field ) => () => void,
	onCollapseField: ( field: Field ) => () => void,
	onClickField: ( field: Field ) => void,
): TreeItemData[] => ids
	.map( id => fields.get( id ) as Field )
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
	fields: Map<number, Field>;
}

const mapStateToProps = ( state: AppState ): StateProps => ({
	fields: state.document.fields.collection,
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
			( field: Field ) => () => dispatch( expandField( field.id )),
			( field: Field ) => () => dispatch( collapseField( field.id )),
			( field: Field ) => {
				dispatch( setPath( fieldPath( field.id, fields )));
			},
		),
});

export default reduxConnect<{}, {}, TreeProps>(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps,
)( Tree );
