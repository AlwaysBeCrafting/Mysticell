import classnames from "classnames";
import React from "react";

import "./Icon.scss";


interface CommonProps {
	className?: string;
}
interface NameProps extends CommonProps {
	name: string;
	src?: undefined;
}
interface SrcProps extends CommonProps {
	name?: undefined;
	src: string;
}
type Props =
	| NameProps
	| SrcProps;
const isNameProps = (props: Props): props is NameProps => (props as any).name;
const Icon = (props: Props) => {
	const className = classnames("icon", props.className);
	return isNameProps(props)
		? (
			<span className={className}>{props.name}</span>
		)
		: (
			<img className={className} src={props.src} />
		);
};


export { Icon };

