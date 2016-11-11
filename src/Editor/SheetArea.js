import React from 'react';

import './SheetArea.less';



const SheetArea = props => <ul id="sheet-area"> {
	props.sheets.map( sheet => <Sheet sheet={ sheet } key={ sheet._id } /> )
} </ul>

const Sheet = props => <li className="sheet" id="sheet-{props._id}">
	<header>{props.sheet.title}</header>
</li>



export default SheetArea;
