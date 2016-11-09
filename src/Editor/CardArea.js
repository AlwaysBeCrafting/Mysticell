import React from 'react';

import './CardArea.less';



const CardArea = ( props ) => {
	return (
		<ul id="card-area"> {
			props.cards.map( (card) =>
				<Card card={ card } key={ card._id } />
			)
		} </ul>
	);
};

const Card = ( props ) => {
	return (
		<li className="card" id="card-{props._id}">
			<header>{ props.card.title }</header>
		</li>
	);
};



export default CardArea;
