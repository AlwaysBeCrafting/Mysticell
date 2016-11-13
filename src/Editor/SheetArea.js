import React from 'react';

import './SheetArea.less';



export default ({ sheets }) => <ul id="sheet-area"> {
	sheets.map( ({ title, _id }) => <li className="sheet" id="sheet-{ _id }" key={ _id }>
		<header>{ title }</header>
	</li> )
} </ul>
