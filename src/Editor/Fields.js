import React from 'react';
import { connect } from 'react-redux';

import Actions from './state/Actions';
import Tree from '../common/Tree';

import './Fields.less';

import ic_formula from './ic_formula.svg';



const mapFieldsToTreeItems = ( fields, expandedFields = [], path = [] ) => fields.map(
	( { _id, name, children } ) => ( {
		id: _id,
		path: [ ...path, name ],
		children: mapFieldsToTreeItems(
			children,
			expandedFields,
			[ ...path, name ],
		),
		expanded: !!expandedFields[_id]
	} )
);
	
const mapStateToProps = state => ( {
	items: mapFieldsToTreeItems( state.doc.fields, state.ui.expandedFields ),
} );

const mapDispatchToProps = dispatch => ( {
	onExpandItem:    item => dispatch( Actions.expandField(   item.id   )),
	onCollapseItem:  item => dispatch( Actions.collapseField( item.id   )),
	onCreateButtons: item => <img
		src={ ic_formula }
		alt="formula"
		onClick={ ev => {
			dispatch( Actions.setPath( item.path ));
			ev.stopPropagation();
		} }
	/>,
} );



export default connect(
	mapStateToProps,
	mapDispatchToProps
)( Tree );
