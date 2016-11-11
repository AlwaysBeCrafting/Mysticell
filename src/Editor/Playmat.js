import React from 'react';

import CardArea from './CardArea';
import SheetArea from './SheetArea';

import './Playmat.less';



const Playmat = props => <div id="playmat">
	<menu type="toolbar" />
	<div id="display-area">
		<CardArea cards={ props.doc.cards } />
		<SheetArea sheets={ props.doc.sheets } />
	</div>
</div>



export default Playmat;
