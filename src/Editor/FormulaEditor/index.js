import React from 'react';

import Toolbar from '../../common/Toolbar';

import NodeArea from './NodeArea';

import './index.less';



const FormulaEditor = props => {
	return <div id="node-area">
		<Toolbar>
			<a className="icon" onClick={ props.onCloseClick }>close</a>
			<label className="path">{ props.path.map( entry => <span key={ entry }>
				/<a>{ entry }</a>
			</span> ) }</label>
		</Toolbar>
		<NodeArea />
	</div>
};



export default FormulaEditor;