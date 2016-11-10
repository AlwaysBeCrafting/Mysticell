import React from 'react';

import Tree from '../common/Tree';

import './Fields.less';
import nodesImg from './ic_nodes.svg';



const Fields = props => {
	return <div id="fields">
		<Tree
			items={ props.fields }
			mapItem={ field => ({
				text: field.name,
				value: field._id,
				children: field.children
			}) }
			makeControls={ (item) => <img
				className="nodes"
				src={ nodesImg }
				alt="Edit nodes"
			/> }
		/>
	</div>
};



export default Fields;
