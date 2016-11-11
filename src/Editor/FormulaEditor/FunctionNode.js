import React from 'react';

import './FunctionNode.less';



const FunctionNode = props => <div className="function-node">
	<header>
		<label>Add</label>
		{ /* Optional button elements */ }
	</header>
	<div className="output"><span className="pin" /><label>Sum</label></div>
	<div className="input"><span className="pin" /><label>A</label></div>
	<div className="input"><span className="pin" /><label>B</label></div>
</div>



export default FunctionNode;
