import * as React from 'react';

import { CardMap} from 'data/doc';

import './CardArea.less';

export interface CardAreaProps {
	visibleCards: number[];
	cards: CardMap;
}

export default (props: CardAreaProps) => {
	const { cards, visibleCards } = props;
	return (
		<ul id="card-area"> {
			visibleCards.map( id => cards[id] )
				.map( ({ title, _id }) => <li className="card" id="card-{ card._id }" key={ _id }>
					<header>{ title }</header>
				</li> )
		} </ul>
	);
};
