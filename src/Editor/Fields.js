import React from 'react';

import Tree from '../common/Tree';



const Fields = props => {
	return <div id="fields">
		<Tree
			items={ props.fields }
			mapItem={ field => ({
				text: field.name,
				value: field._id,
				children: field.children
			}) }
			makeControls={ (item) => <img className="nodes" src="images/ic_nodes.png" /> }
		/>
	</div>
};



export default Fields;
