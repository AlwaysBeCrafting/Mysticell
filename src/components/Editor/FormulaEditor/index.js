import React from 'react';
import { connect } from 'react-redux';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import setPath from 'state/setPath';
import addNode from 'state/addNode';

import Toolbar from 'components/common/Toolbar';
import FAB from 'components/common/FAB';

import NodeArea from './NodeArea';

import './index.less';



const fieldAtPath = ( path, rootField, fields ) => path.reduce(
	( field, childName ) => field.children
		.map( id => fields[id] )
		.find( child => child.name === childName ),
	rootField,
);



class FormulaEditor extends React.PureComponent {
	render() {
		const { path, rootField, fields, onPathClick, onCreateNode } = this.props;
		const field = fieldAtPath( path, rootField, fields );
		
		return <div id="node-editor">
			<Toolbar>
				<button className="icon" onClick={ () => onPathClick( [] ) }>close</button>
				<nav className="expanding path">{
					path.map(( entry, i ) => <a
						tabIndex="0"
						key={ entry }
						onClick={ () => onPathClick( path.slice( 0, i + 1 )) }>
						
						{ entry }</a> )
				}</nav>
				<a className="icon">undo</a>
				<a className="icon">redo</a>
			</Toolbar>
			<NodeArea formula={ field.formula } />
			<FAB icon="add" onClick={ () => onCreateNode( field._id ) } />
		</div>;
	}
}



const ConnectedNodeEditor = connect(
	state => ({
		path:      state.path,
		rootField: { children: state.doc.rootFields },
		fields:    state.doc.fields,
	}),
	dispatch => ({
		onPathClick:  path => dispatch( setPath( path )),
		onCreateNode: fieldId => dispatch( addNode( fieldId, 'ADD' )),
	}),
)( FormulaEditor );



export default DragDropContext( HTML5Backend )( ConnectedNodeEditor );
