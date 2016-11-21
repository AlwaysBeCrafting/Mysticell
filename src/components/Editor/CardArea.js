import React from 'react';

import './CardArea.less';



export default ({ visibleCards, cards }) => <ul id="card-area"> {
	visibleCards.map( id => cards[id] )
		.map( ({ title, _id }) => <li className="card" id="card-{ card._id }" key={ _id }>
			<header>{ title }</header>
		</li> )
} </ul>;
