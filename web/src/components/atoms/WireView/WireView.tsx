import classNames from "classnames";
import React from "react";

import { Position2d } from "common/types";

import { useNode } from "data/Node";
import { useSource } from "data/Source";
import { useWire } from "data/Wire";

import "./WireView.scss";

interface Props {
  wireId: string;
  className?: string;
}

const WireView = (props: Props) => {
  const { className, wireId } = props;

  const [wire] = useWire(wireId);
  if (!wire) return null;

  const [tailNode] = useNode(wire.tail.nodeId);
  const [headNode] = useNode(wire.head.nodeId);
  if (!tailNode || !headNode) return null;

  const [headSource] = useSource(headNode.sourceId);
  if (!headSource) return null;

  const tailPos = new Position2d(
    tailNode.position.x + 4,
    tailNode.position.y + 1.5,
  );
  const headPos = new Position2d(
    headNode.position.x,
    headNode.position.y + headSource.outputs.size + 1.5,
  );

  const offsetX = Math.max(Math.abs((headPos.x - tailPos.x) / 2), 1);
  const controlX = [tailPos.x + offsetX, headPos.x - offsetX];
  const center = [(tailPos.x + headPos.x) / 2, (tailPos.y + headPos.y) / 2];
  const centerOffset = (tailPos.y - headPos.y) / 4;

  const centerPoint =
    controlX[1] < controlX[0]
      ? `  ${controlX[0] * 40},${(center[1] + centerOffset) * 40} ` +
        `  ${center[0] * 40},${center[1] * 40} ` +
        `C ${controlX[1] * 40},${(center[1] - centerOffset) * 40} `
      : "";

  const pathString =
    `M ${tailPos.x * 40},${tailPos.y * 40} ` +
    `C ${controlX[0] * 40},${tailPos.y * 40} ` +
    centerPoint +
    `  ${controlX[1] * 40},${headPos.y * 40} ` +
    `  ${headPos.x * 40},${headPos.y * 40} `;

  return <path className={classNames("WireView", className)} d={pathString} />;
};

export { WireView };
