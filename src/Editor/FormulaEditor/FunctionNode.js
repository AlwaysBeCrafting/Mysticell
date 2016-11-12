import React from 'react';

import './FunctionNode.less';



const FunctionNode = props => <div className="function-node">
	<header>
		<label>{ props.name }</label>
		{ /* Optional button elements */ }
	</header>
	{ ( props.outputs || [] ).map( output => <div className="output" key={ output.name }>
		<span className="pin" /><label>{ output.name }</label>
	</div>) }
	{ ( props.inputs || [] ).map( input => <div className="input" key={ input.name }>
		<span className="pin" /><label>{ input.name }</label>
	</div>) }
</div>



export default FunctionNode;
