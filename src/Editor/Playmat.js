import React from 'react';

import CardArea from './CardArea';
import SheetArea from './SheetArea';

import './Playmat.less';



export default ({ doc }) => <div id="playmat">
	<menu type="toolbar" />
	<div id="display-area">
		<CardArea cards={ doc.cards } />
		<SheetArea sheets={ doc.sheets } />
	</div>
</div>
