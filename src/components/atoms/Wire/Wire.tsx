import classNames from "classnames";
import React from "react";

import { Position2d } from "common/types";

import "./Wire.scss";

interface Props {
  startPos: Position2d;
  endPos: Position2d;
  className?: string;
}

const Wire = ({ startPos, endPos, className, ...attrs }: Props) => {
  const offsetX = Math.max(Math.abs((endPos.x - startPos.x) / 2), 1);
  const controlX = [startPos.x + offsetX, endPos.x - offsetX];
  const center = [(startPos.x + endPos.x) / 2, (startPos.y + endPos.y) / 2];
  const centerOffset = (startPos.y - endPos.y) / 4;

  const centerPoint =
    controlX[1] < controlX[0]
      ? `  ${controlX[0]},${center[1] + centerOffset} ` +
        `  ${center[0]},${center[1]} ` +
        `C ${controlX[1]},${center[1] - centerOffset} `
      : "";

  const pathString =
    `M ${startPos.x},${startPos.y} ` +
    `C ${controlX[0]},${startPos.y} ` +
    centerPoint +
    `  ${controlX[1]},${endPos.y} ` +
    `  ${endPos.x},${endPos.y} `;

  return (
    <path {...attrs} className={classNames("wire", className)} d={pathString} />
  );
};

export { Wire };
