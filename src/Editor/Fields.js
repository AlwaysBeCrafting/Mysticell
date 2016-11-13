import React from 'react';

import Tree from '../common/Tree';

import './Fields.less';
import nodesImg from './ic_formula.svg';



export default ({ fields, setPath }) => <div id="fields">
	<Tree
		items={ fields }
		mapItem={ ({ name, children, _id }) => ({
			text: name,
			value: _id,
			buttons: [
				{ src: nodesImg, onClick: setPath }
			],
			children: children,
			expanded: true,
			expand: () => {},
			collapse: () => {},
		}) }
	/>
</div>
