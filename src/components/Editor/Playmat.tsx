import * as React from 'react';
import { connect as reduxConnect } from 'react-redux';

import AppState, { CardState, SheetState } from 'state';

import CardArea from './CardArea';
import SheetArea from './SheetArea';

import './Playmat.less';

interface PlaymatProps {
	cards: Map<number, CardState>;
	sheets: Map<number, SheetState>;
}

const Playmat = ( props: PlaymatProps ) => <div id="playmat">
	<menu type="toolbar" />
	<div id="display-area">
		<CardArea cards={ props.cards } />
		<SheetArea sheets={ props.sheets } />
	</div>
</div>;

export default reduxConnect<PlaymatProps, {}, {}>(
	({ cards, sheets }) => ({ cards, sheets }),
)( Playmat );
