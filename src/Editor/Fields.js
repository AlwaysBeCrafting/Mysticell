import React from 'react';

import Tree from '../common/Tree';

import './Fields.less';
import nodesImg from './ic_formula.svg';



const Fields = props => {
	return <div id="fields">
		<Tree
			items={ props.fields }
			mapItem={ field => ({
				text: field.name,
				value: field._id,
				children: field.children,
				buttons: [
					{ img: nodesImg, onClick: props.setPath }
				]
			}) }
		/>
	</div>
};



export default Fields;
