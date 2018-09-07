import classNames from "classnames";
import React from "react";

import { Position2d } from "common/types";

import "./Wire.scss";

interface Props {
  startPos: Position2d;
  endPos: Position2d;
  className?: string;
}

const Wire = (props: Props) => {
  const { className } = props;
  const startPos = props.startPos;
  const endPos = new Position2d(
    props.endPos.x === Infinity ? 1000 : props.endPos.x,
    props.endPos.y,
  );
  const offsetX = Math.max(Math.abs((endPos.x - startPos.x) / 2), 1);
  const controlX = [startPos.x + offsetX, endPos.x - offsetX];
  const center = [(startPos.x + endPos.x) / 2, (startPos.y + endPos.y) / 2];
  const centerOffset = (startPos.y - endPos.y) / 4;

  const centerPoint =
    controlX[1] < controlX[0]
      ? `  ${controlX[0] * 40},${(center[1] + centerOffset) * 40} ` +
        `  ${center[0] * 40},${center[1] * 40} ` +
        `C ${controlX[1] * 40},${(center[1] - centerOffset) * 40} `
      : "";

  const pathString =
    `M ${startPos.x * 40},${startPos.y * 40} ` +
    `C ${controlX[0] * 40},${startPos.y * 40} ` +
    centerPoint +
    `  ${controlX[1] * 40},${endPos.y * 40} ` +
    `  ${endPos.x * 40},${endPos.y * 40} `;

  return <path className={classNames("wire", className)} d={pathString} />;
};

export { Wire };
