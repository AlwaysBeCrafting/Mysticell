import classNames from "classnames";
import React from "react";

import { Position2d } from "common/types";

import "./Wire.scss";

interface Props {
  srcPos: Position2d;
  tgtPos: Position2d;
  className?: string;
}

const Wire = ({ srcPos, tgtPos, className, ...attrs }: Props) => {
  const offsetX = Math.max(Math.abs((tgtPos.x - srcPos.x) / 2), 1);
  const controlX = [srcPos.x + offsetX, tgtPos.x - offsetX];
  const center = [(srcPos.x + tgtPos.x) / 2, (srcPos.y + tgtPos.y) / 2];
  const centerOffset = (srcPos.y - tgtPos.y) / 4;

  const centerPoint =
    controlX[1] < controlX[0]
      ? `  ${controlX[0] * 40},${(center[1] + centerOffset) * 40 + 20} ` +
        `  ${center[0] * 40},${center[1] * 40 + 20} ` +
        `C ${controlX[1] * 40},${(center[1] - centerOffset) * 40 + 20} `
      : "";

  const pathString =
    `M ${srcPos.x * 40},${srcPos.y * 40 + 20} ` +
    `C ${controlX[0] * 40},${srcPos.y * 40 + 20} ` +
    centerPoint +
    `  ${controlX[1] * 40},${tgtPos.y * 40 + 20} ` +
    `  ${tgtPos.x * 40},${tgtPos.y * 40 + 20} `;

  return (
    <path {...attrs} className={classNames("wire", className)} d={pathString} />
  );
};

export { Wire };
