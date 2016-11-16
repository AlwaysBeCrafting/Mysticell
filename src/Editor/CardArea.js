import React from 'react';

import './CardArea.less';



export default ({ cards }) => <ul id="card-area"> {
	cards.map( ({ title, _id }) => <li className="card" id="card-{ card._id }" key={ _id }>
		<header>{ title }</header>
	</li> )
} </ul>;
