import classNames from "classnames";
import React from "react";

import "./Card.scss";


interface Props extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
}

const Card = ({className, children, ...attrs}: Props) => (
	<div className={classNames("card", className)} {...attrs}>
		{children}
	</div>
);


export {Card};
