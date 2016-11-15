import React from 'react';
import Actions from '../state/Actions';
import { connect } from 'react-redux';

import Toolbar from '../../common/Toolbar';

import NodeArea from './NodeArea';

import './index.less';



const NodeEditor = ({ setPath, path }) => <div id="node-editor">
	<Toolbar>
		<a className="icon" onClick={ () => setPath( [] ) }>close</a>
		<label className="expanding path"> {
			path.map( (entry,i) => <a
				key={ entry }
				onClick={ () => setPath( path.slice( 0, i + 1 )) }
			>{ entry }</a> )
		} </label>
		<a className="icon">undo</a>
		<a className="icon">redo</a>
	</Toolbar>
	<NodeArea />
</div>



const mapStateToProps = state => ({
	path: state.path,
});

const mapDispatchToProps = dispatch => ({
	setPath: path => dispatch( Actions.setPath( path )),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)( NodeEditor );
