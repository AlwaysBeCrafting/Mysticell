import React from 'react';
import { connect } from 'react-redux';

import CardArea from './CardArea';
import SheetArea from './SheetArea';

import './Playmat.less';



const Playmat = ({ doc }) => <div id="playmat">
	<menu type="toolbar" />
	<div id="display-area">
		<CardArea cards={ doc.cards } />
		<SheetArea sheets={ doc.sheets } />
	</div>
</div>;

export default connect(
	({ doc }) => ({ doc }),
)( Playmat );
