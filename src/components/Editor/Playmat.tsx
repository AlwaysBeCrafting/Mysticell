import * as React from 'react';
import { connect } from 'react-redux';

import Doc from 'data/doc';

import CardArea from './CardArea';
import SheetArea from './SheetArea';

import './Playmat.less';

const Playmat = (props: { doc: Doc }) => <div id="playmat">
	<menu type="toolbar" />
	<div id="display-area">
		<CardArea cards={ props.doc.cards } visibleCards={ props.doc.visibleCards } />
		<SheetArea sheets={ props.doc.sheets } visibleSheets={ props.doc.visibleSheets } />
	</div>
</div>;

export default connect(
	({ doc }) => ({ doc }),
)( Playmat );
