import * as React from 'react';
import { connect as reduxConnect } from 'react-redux';

import AppState, { CardState, SheetState } from 'state';

import CardArea from './CardArea';
import SheetArea from './SheetArea';

import './Playmat.less';

interface PlaymatState {
	cards: Map<number, CardState>;
	sheets: Map<number, SheetState>;
}

const Playmat = ( props: PlaymatState ) => <div id="playmat">
	<menu type="toolbar" />
	<div id="display-area">
		<CardArea cards={ props.cards } />
		<SheetArea sheets={ props.sheets } />
	</div>
</div>;

export default reduxConnect<PlaymatState, {}, {}>(
	({ cards, sheets }) => ({ cards, sheets }),
)( Playmat );
