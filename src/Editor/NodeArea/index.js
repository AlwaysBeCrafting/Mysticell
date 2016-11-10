import React from 'react';

import Toolbar from '../../common/Toolbar';

import NodeEditor from './NodeEditor';

import './index.less';



const NodeArea = ( props ) => {
	return <div id="node-area">
		<Toolbar>
			<a className="icon">arrow_back</a>
		</Toolbar>
		<NodeEditor />
	</div>
};



export default NodeArea;