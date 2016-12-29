import * as React from 'react';

import { CardState } from 'state';

import './CardArea.less';

export interface CardAreaProps {
	cards: Map<number, CardState>;
}

export default ( props: CardAreaProps ) => <ul id="card-area"> {
	Array.from( props.cards )
		.map(([ id, card ]) => card )
		.filter( card => card.isVisible )
		.map( ({ title, id }) => <li className="card" id={ `card-${ id }` } key={ id }>
			<header>{ title }</header>
		</li> )
} </ul>;
