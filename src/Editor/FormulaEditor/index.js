import React from 'react';
import { connect } from 'react-redux';

import setPath from '../state/setPath';
import Toolbar from '../../common/Toolbar';
import NodeArea from './NodeArea';

import './index.less';



const NodeEditor = ({ onPathClick, path }) => <div id="node-editor">
	<Toolbar>
		<button className="icon" onClick={ () => onPathClick( [] ) }>close</button>
		<nav className="expanding path">{
			path.map( (entry, i) => <a
				tabIndex="0"
				key={ entry }
				onClick={ () => onPathClick( path.slice( 0, i + 1 )) }>
				
				{ entry }</a> )
		}</nav>
		<a className="icon">undo</a>
		<a className="icon">redo</a>
	</Toolbar>
	<NodeArea />
</div>;



const mapStateToProps = state => ({
	path: state.path,
});

const mapDispatchToProps = dispatch => ({
	onPathClick: path => dispatch( setPath( path )),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)( NodeEditor );
