import React from 'react';

import './FunctionNode.less';



export default ({ name, inputs, outputs, children }) => <div className="function-node">
	<header>
		<label>{ name }</label>
		{ children }
	</header>
	{ ( outputs || [] ).map( output => <div className="output" key={ output.name }>
		<span className="pin" />
		<label>{ output.name }</label>
	</div>) }
	{ ( inputs || [] ).map( input => <div className="input" key={ input.name }>
		<span className="pin" />
		<label>{ input.name }</label>
	</div>) }
</div>
