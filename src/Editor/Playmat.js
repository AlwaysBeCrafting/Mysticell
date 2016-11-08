import React from 'react';

import CardArea from './CardArea';
import SheetArea from './SheetArea';



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
