import React from 'react';

import './SheetArea.less';



export default ({ sheets, visibleSheets }) => <ul id="sheet-area"> {
	visibleSheets.map( id => sheets[id] )
		.map( ({ title, _id }) => <li className="sheet" id="sheet-{ _id }" key={ _id }>
			<header>{ title }</header>
		</li> )
} </ul>;
