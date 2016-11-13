import React from 'react';

import Toolbar from '../../common/Toolbar';

import NodeArea from './NodeArea';

import './index.less';



export default ({ setPath, path }) => <div id="node-editor">
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
