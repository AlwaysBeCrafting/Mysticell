import React from 'react';

import './SheetArea.less';



export default ({ sheets }) => <ul id="sheet-area"> {
	sheets.map( sheet => <li className="sheet" id="sheet-{ sheet._id }">
		<header>{ sheet.title }</header>
	</li> )
} </ul>
