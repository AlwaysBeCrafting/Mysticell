import React from 'react';

import Toolbar from '../../common/Toolbar';

import NodeArea from './NodeArea';

import './index.less';



const FormulaEditor = ( props ) => {
	console.log( props.path );
	return <div id="node-area">
		<Toolbar>
			<a className="icon" onClick={ props.onCloseClick }>close</a>
		</Toolbar>
		<NodeArea />
	</div>
};



export default FormulaEditor;