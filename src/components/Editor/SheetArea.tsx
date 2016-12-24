import * as React from 'react';

import { SheetState } from 'state';

import './SheetArea.less';

interface SheetAreaProps {
	sheets: Map<number, SheetState>;
}

export default ( props: SheetAreaProps ) => <ul id="sheet-area"> {
	Array.from( props.sheets )
		.map( ([ id, sheet ]) => sheet )
		.filter( sheet => sheet.isVisible )
		.map(({ title, id }) => <li className="sheet" id={ `sheet-${ id }` } key={ id }>
			<header>{ title }</header>
		</li> )
} </ul>;
