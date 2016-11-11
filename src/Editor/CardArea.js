import React from 'react';

import './CardArea.less';



const CardArea = props => <ul id="card-area"> {
	props.cards.map( card => <Card card={ card } key={ card._id } /> )
} </ul>

const Card = props => <li className="card" id="card-{props._id}">
	<header>{ props.card.title }</header>
</li>



export default CardArea;
