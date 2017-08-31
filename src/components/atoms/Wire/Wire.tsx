import classNames from "classnames";
import React from "react";

import "./Wire.scss";


interface Props {
	srcPos: [number, number];
	dstPos: [number, number];
	className?: string;
}

const Wire = ({srcPos, dstPos, className, ...attrs}: Props) => {
	const center = [
		(srcPos[0] + dstPos[0]) / 2,
		(srcPos[1] + dstPos[1]) / 2,
	];

	const pathString = (
		`M ${srcPos[0] * 40},${srcPos[1] * 40 + 20} ` +
		`C ${center[0] * 40},${srcPos[1] * 40 + 20} ` +
		`  ${center[0] * 40},${dstPos[1] * 40 + 20} ` +
		`  ${dstPos[0] * 40},${dstPos[1] * 40 + 20} `
	);

	return (
		<path {...attrs} className={classNames("wire", className)} d={pathString} />
	);
};


export {Wire};
