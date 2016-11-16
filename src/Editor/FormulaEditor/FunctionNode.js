import React from 'react';

import './FunctionNode.less';



export default ({ name, inputs, outputs }) => <div className="function-node">
	<header>{ name }</header>
	{ ( outputs || [] ).map( output => <div className="output" key={ output.name }>
		<span className="pin" />
		{ output.name }
	</div>) }
	{ ( inputs || [] ).map( input => <div className="input" key={ input.name }>
		<span className="pin" />
		{ input.name }
	</div>) }
</div>;
