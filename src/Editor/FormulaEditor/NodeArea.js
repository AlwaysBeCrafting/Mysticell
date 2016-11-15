import React from 'react';

import FunctionNode from './FunctionNode';

import './NodeArea.less';



export default ({ nodes }) => <div id="node-area">
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
