import * as React from "react";

import { CardState } from "redux/state";

import "./Card.less";

interface CardProps {
	card: CardState;
}

export default ( props: CardProps ) => (
	<li className="card" id={ `card-${ props.card.id }` } key={ props.card.id }>
		<header>{ props.card.title }</header>
	</li>
);
