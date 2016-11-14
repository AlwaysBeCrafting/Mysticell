import Actions from './state/Actions';
import { connect } from 'react-redux';

import Tree from '../common/Tree';

import './Fields.less';



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
	onExpandItem: id => dispatch( Actions.expandField( id )),
	onCollapseItem: id => dispatch( Actions.collapseField( id )),
} );



export default connect(
	mapStateToProps,
	mapDispatchToProps
)( Tree );
