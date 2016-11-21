import React from 'react';
import { connect } from 'react-redux';

import CardArea from './CardArea';
import SheetArea from './SheetArea';

import './Playmat.less';



const Playmat = ({ doc }) => <div id="playmat">
	<menu type="toolbar" />
	<div id="display-area">
		<CardArea cards={ doc.cards } visibleCards={ doc.visibleCards } />
		<SheetArea sheets={ doc.sheets } visibleSheets={ doc.visibleSheets } />
	</div>
</div>;

export default connect(
	({ doc }) => ({ doc }),
)( Playmat );
