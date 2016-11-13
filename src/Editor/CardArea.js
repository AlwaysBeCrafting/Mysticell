import React from 'react';

import './CardArea.less';



export default ({ cards }) => <ul id="card-area"> {
	cards.map( card => <li className="card" id="card-{ card._id }">
		<header>{ card.title }</header>
	</li> )
} </ul>
