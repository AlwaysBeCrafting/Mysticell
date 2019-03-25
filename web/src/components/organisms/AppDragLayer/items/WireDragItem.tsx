import React from "react";

import { Position2d } from "common/types";

import "./WireDragItem.scss";

interface StartProps {
  start: Position2d;
  end?: undefined;
  currentOffset: Position2d;
}
interface EndProps {
  start?: undefined;
  end: Position2d;
  currentOffset: Position2d;
}
type Props = StartProps | EndProps;

const WireDragItem = (props: Props) => {
  const { start, end, currentOffset } = props;
  const startPos = start || currentOffset;
  const endPos = end || currentOffset;
  // TODO Make an SVG component to share with WireView
  return (
    <svg className="WireDragItem">
      <div>
        {startPos.x},{startPos.y}
      </div>
      <div>
        {endPos.x},{endPos.y}
      </div>
    </svg>
  );
};

export { WireDragItem };
