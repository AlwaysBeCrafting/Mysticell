import React from 'react';
import { connect } from 'react-redux';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import setPath from '../state/setPath';
import Toolbar from '../../common/Toolbar';
import NodeArea from './NodeArea';

import './index.less';


const fieldAtPath = ( rootField, path ) => path.reduce(
	( field, childName ) => field.children.find( child => child.name === childName ),
	rootField,
);
	


class FormulaEditor extends React.PureComponent {
	render() {
		const { onPathClick, path, rootField } = this.props;
		const field = fieldAtPath( rootField, path );
		
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
		</div>;
	}
}



const ConnectedNodeEditor = connect(
	state => ({
		path:      state.path,
		rootField: { children: state.doc.fields },
	}),
	dispatch => ({
		onPathClick: path => dispatch( setPath( path )),
	}),
)( FormulaEditor );



export default DragDropContext( HTML5Backend )( ConnectedNodeEditor );
