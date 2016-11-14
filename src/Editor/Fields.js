import { connect } from 'react-redux';

import Tree from '../common/Tree';

import './Fields.less';



const mapFieldsToTreeItems = ( fields, path = [], expandedFields = [] ) => fields.map(
	( { _id, name, children } ) => ( {
		id: _id,
		path: [ ...path, name ],
		children: mapFieldsToTreeItems(
			children,
			[ ...path, name ],
			expandedFields
		),
		expanded: !!expandedFields[_id]
	} )
);
	
const mapStateToProps = state => ( {
	items: mapFieldsToTreeItems( state.doc.fields ),
} );

const mapDispatchToProps = dispatch => ( {
	onExpand: () => {},
	onCollapse: () => {},
} );



export default connect(
	mapStateToProps,
	mapDispatchToProps
)( Tree );
