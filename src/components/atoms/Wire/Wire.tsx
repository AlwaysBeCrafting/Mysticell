import classNames from "classnames";
import React from "react";

import "./Wire.scss";

interface Props {
  srcPos: [number, number];
  tgtPos: [number, number];
  className?: string;
}

const Wire = ({ srcPos, tgtPos, className, ...attrs }: Props) => {
  const offsetX = Math.max(Math.abs((tgtPos[0] - srcPos[0]) / 2), 1);
  const controlX = [srcPos[0] + offsetX, tgtPos[0] - offsetX];
  const center = [(srcPos[0] + tgtPos[0]) / 2, (srcPos[1] + tgtPos[1]) / 2];
  const centerOffset = (srcPos[1] - tgtPos[1]) / 4;

  const centerPoint =
    controlX[1] < controlX[0]
      ? `  ${controlX[0] * 40},${(center[1] + centerOffset) * 40 + 20} ` +
        `  ${center[0] * 40},${center[1] * 40 + 20} ` +
        `C ${controlX[1] * 40},${(center[1] - centerOffset) * 40 + 20} `
      : "";

  const pathString =
    `M ${srcPos[0] * 40},${srcPos[1] * 40 + 20} ` +
    `C ${controlX[0] * 40},${srcPos[1] * 40 + 20} ` +
    centerPoint +
    `  ${controlX[1] * 40},${tgtPos[1] * 40 + 20} ` +
    `  ${tgtPos[0] * 40},${tgtPos[1] * 40 + 20} `;

  return (
    <path {...attrs} className={classNames("wire", className)} d={pathString} />
  );
};

export { Wire };
