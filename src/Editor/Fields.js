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
	onCreateButtons: () => {},
} );

const mapDispatchToProps = dispatch => ( {
	onExpandItem: item => dispatch( Actions.expandField( item.id )),
	onCollapseItem: item => dispatch( Actions.collapseField( item.id )),
} );



export default connect(
	mapStateToProps,
	mapDispatchToProps
)( Tree );
