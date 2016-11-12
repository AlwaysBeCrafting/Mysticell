import React from 'react';

import Toolbar from '../../common/Toolbar';

import NodeArea from './NodeArea';

import './index.less';



const FormulaEditor = props => <div id="node-area">
	<Toolbar>
		<a className="icon" onClick={ () => props.setPath( [] ) }>close</a>
		<label className="path">
			{ props.path.map( (entry,i) => <a
				key={ entry }
				onClick={ () => props.setPath( props.path.slice( 0, i + 1 )) }
			>{ entry }</a> ) }
		</label>
	</Toolbar>
	<NodeArea />
</div>



export default FormulaEditor;