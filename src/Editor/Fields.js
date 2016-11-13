import React from 'react';

import Tree from '../common/Tree';

import './Fields.less';
import nodesImg from './ic_formula.svg';



export default ({ fields, setPath }) => <div id="fields">
	<Tree
		items={ fields }
		mapItem={ field => ({
			text: field.name,
			value: field._id,
			children: field.children,
			buttons: [
				{ img: nodesImg, onClick: setPath }
			]
		}) }
	/>
</div>
