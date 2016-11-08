import React from 'react';



const SheetArea = ( props ) => {
	return (
		<ul id="sheet-area"> {
			props.sheets.map( (sheet) =>
				<Sheet sheet={ sheet } key={ sheet._id } />
			)
		} </ul>
	);
};

const Sheet = ( props ) => {
	return (
		<li className="sheet" id="sheet-{props._id}">
			<header>{props.sheet.title}</header>
		</li>
	);
};



export default SheetArea;
