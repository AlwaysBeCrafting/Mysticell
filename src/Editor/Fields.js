import React from 'react';
import { connect } from 'react-redux';

import { expandField, collapseField, setPath } from './state/Actions';
import Tree from '../common/Tree';

import './Fields.less';

import icFormula from './ic_formula.svg';



const mapFieldsToTreeItems = ( fields, expandedFields = [], path = [] ) => fields.map(
	( { _id, name, children } ) => ( {
		id:       _id,
		path:     [ ...path, name ],
		children: mapFieldsToTreeItems(
			children,
			expandedFields,
			[ ...path, name ],
		),
		expanded: !!expandedFields[_id],
	} ),
);

const mapStateToProps = state => ( {
	items: mapFieldsToTreeItems( state.doc.fields, state.ui.expandedFields ),
} );

const mapDispatchToProps = dispatch => ( {
	onExpandItem:    item => dispatch( expandField(   item.id )),
	onCollapseItem:  item => dispatch( collapseField( item.id )),
	onCreateButtons: item => <button
		onClick={ ev => {
			dispatch( setPath( item.path ));
			ev.stopPropagation();
		} }>
		<img
			src={ icFormula }
			alt="formula" />
	</button>,
} );



export default connect(
	mapStateToProps,
	mapDispatchToProps,
)( Tree );
