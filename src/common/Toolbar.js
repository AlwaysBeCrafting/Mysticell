import React from 'react';

import './Toolbar.less'



const Toolbar = ( props ) => {
	return <menu type="toolbar">{ props.children }</menu>
};



export default Toolbar;