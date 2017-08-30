import classNames from "classnames";
import React from "react";

import "./Card.scss";


interface Props {
	className?: string;
	children?: JSX.Element[] | string;
}


const Card = ({ className, children }: Props) => (
	<div className={ classNames("card", className) }>
		{ children }
	</div>
);


export { Card };
