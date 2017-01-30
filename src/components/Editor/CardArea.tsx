import * as React from "react";

import { CardState } from "redux/state";

import Card from "./Card";

import "./CardArea.less";

export interface CardAreaProps {
	cards: Map<number, CardState>;
}

export default ( props: CardAreaProps ) => <ul id="card-area"> {
	Array.from( props.cards )
		.filter(([ id, card ]) => card.isVisible )
		.map(([ id, card ]) => <Card card={ card } /> )
} </ul>;
