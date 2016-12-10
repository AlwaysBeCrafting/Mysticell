import * as React from 'react';

import { Sheet, SheetMap } from 'data/doc';

import './SheetArea.less';

export default (props: { sheets: SheetMap, visibleSheets: number[] }) => <ul id="sheet-area"> {
	props.visibleSheets.map( (id: any) => props.sheets.get( id ) as Sheet )
		.map( ({ title, _id }) => <li className="sheet" id="sheet-{ _id }" key={ _id }>
			<header>{ title }</header>
		</li> )
} </ul>;
