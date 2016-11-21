import React from 'react';
import { connect } from 'react-redux';

import expandField   from 'state/expandField';
import collapseField from 'state/collapseField';
import setPath       from 'state/setPath';

import Tree from 'components/common/Tree';

import './Fields.less';

import icFormula from './ic_formula.svg';



const mapFieldIdsToTreeItems = ( ids, fields, expandedFields = [], path = [] ) =>
	ids.map( id => fields[id] )
		.map(({ _id, name, children }) => ( {
			id:       _id,
			path:     [ ...path, name ],
			children: mapFieldIdsToTreeItems(
				children,
				fields,
				expandedFields,
				[ ...path, name ],
			),
			expanded: !!expandedFields[_id],
		} ),
	);

const mapStateToProps = state => ( {
	items: mapFieldIdsToTreeItems( state.doc.rootFields, state.doc.fields, state.ui.expandedFields ),
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
