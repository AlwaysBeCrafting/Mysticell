import React from "react";

import "./ToolButton.scss";


interface Props extends React.HTMLAttributes<HTMLButtonElement> {
	title: string;
	icon?: string;
	enabled?: boolean;
	checkable?: boolean;
	checked?: boolean;
}

const ToolButton = (props: Props) => {
	const { title, icon } = props;
	const iconElem = icon && (
		<img
			className="toolButton-icon"
			title={title}
			src={icon}
		/>
	);

	return (
		<button className="toolButton">
			{iconElem || title}
		</button>
	);
};


export {ToolButton};
