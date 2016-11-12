import React from 'react';

import FunctionNode from './FunctionNode';

import './NodeArea.less';



const NodeArea = props => <div id="node-editor">
	<FunctionNode
		name="Add"
		inputs={ [
			{ name: 'A' },
			{ name: 'B' }
		] }
		outputs={ [
			{ name: 'Sum'}
		] }
	/>
</div>



export default NodeArea;