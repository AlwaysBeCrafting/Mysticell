import * as React from 'react';

import { Sheet, SheetMap } from 'data/doc';

import './SheetArea.less';

export default (props: { sheets: SheetMap, visibleSheets: number[] }) => <ul id="sheet-area"> {
	props.visibleSheets.map( (id: any) => props.sheets.get( id ) as Sheet )
		.map( ({ title, id }) => <li className="sheet" id={ `sheet-${ id }` } key={ id }>
			<header>{ title }</header>
		</li> )
} </ul>;
