import React from 'react';

import CardArea from './CardArea';
import SheetArea from './SheetArea';

import './Playmat.less';



const Playmat = ( props ) => {
	return (
		<div id="playmat">
			<div id="display-area">
				<CardArea cards={ props.cards } />
				<SheetArea sheets={ props.sheets } />
			</div>
		</div>
	);
};



export default Playmat;
