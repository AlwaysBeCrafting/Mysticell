import classNames from "classnames";
import React from "react";

import { MenuItem } from "data/common";

import { ToolButton } from "components/atoms";

import "./Toolbar.scss";


interface Props extends React.HTMLAttributes<HTMLMenuElement> {
	title: string;
	navItem?: MenuItem;
	items?: MenuItem[];
}

const Toolbar = ({title, navItem, items, className, ...attrs}: Props) => (
	<menu type="toolbar" {...attrs} className={classNames("toolbar", className)}>
		{
			navItem && (
				<ToolButton title={navItem.title}/>
			)
		}
		<li className="toolbar-title">{title}</li>
		{
			items && items
				.map(item => <ToolButton title={item.title} key={item.id} />)
		}
	</menu>
);


export { Toolbar };
