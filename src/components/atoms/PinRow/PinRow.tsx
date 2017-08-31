import classNames from "classnames";
import React from "react";

import {Param} from "data/common";

import "./PinRow.scss";


interface AlwaysProps {
	name: string;
	className?: string;
}

interface SrcProps extends AlwaysProps {
	type: "src";
	computedValue: Param;
}

interface DstProps extends AlwaysProps {
	type: "dst";
	isConnected: boolean;
	param: Param;
	userValue: string;
}

type Props = SrcProps | DstProps;

const PinRow = (props: Props) => {
	const {name, type, className} = props;
	return (
		<div
			className={classNames(`pinRow ${type}PinRow`, className)}
			key={name}
		>
			<div className={`pinRow-pin ${type}PinRow-pin`} />
			<label className="pinRow-label">{name}</label>
			{
				props.type === "dst"
					&& !props.isConnected
					&& <input className="pinRow-value" value={props.userValue} />
			}
		</div>
	);
};


export {PinRow};
