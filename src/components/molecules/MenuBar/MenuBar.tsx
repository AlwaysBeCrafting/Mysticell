import classNames from "classnames";
import React from "react";

import {MenuItem} from "data/common";

import "./MenuBar.scss";


interface Props {
	items: MenuItem[];
	className?: string;
}

const MenuBar = (props: Props) => (
	<div className={classNames("menuBar", props.className)}>
		{props.items.map(item => {
			if (item.render) {
				return item.render(item);
			} else {
				return (
					<button className="menuBar-item" key={item.id}>
						{item.title}
					</button>
				);
			}
		})}
	</div>
);


export {MenuBar};
