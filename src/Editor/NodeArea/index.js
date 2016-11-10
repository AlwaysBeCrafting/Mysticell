import React from 'react';

import NodeEditor from './NodeEditor';

import './index.less';



const NodeArea = ( props ) => {
	return <div id="node-area">
		<menu type="toolbar">
			<li><a>arrow_back</a></li>
		</menu>
		<NodeEditor />
	</div>
};



export default NodeArea;