import * as React from 'react';
import { connect } from 'react-redux';

import AppState from 'state';

import CardArea from './CardArea';
import SheetArea from './SheetArea';

import './Playmat.less';

interface PlaymatProps {
	app: AppState;
}

const Playmat = ( props: PlaymatProps ) => <div id="playmat">
	<menu type="toolbar" />
	<div id="display-area">
		<CardArea cards={ props.app.cards } />
		<SheetArea sheets={ props.app.sheets } />
	</div>
</div>;

export default connect(
	( app ) => ({ app }),
)( Playmat );
