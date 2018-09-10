import React from "react";

import { Position2d } from "common/types";

import { Wire } from "components/atoms";

import { DragItem } from "./DragItem";

import "./WireDragItem.scss";

interface StartProps {
  start: Position2d;
  end?: undefined;
}
interface EndProps {
  start?: undefined;
  end: Position2d;
}
type Props = StartProps | EndProps;

class WireDragItem extends DragItem<Props> {
  render() {
    const start = this.props.start || this.props.currentOffset;
    const end = this.props.end || this.props.currentOffset;
    const startPos = new Position2d(start.x, start.y);
    const endPos = new Position2d(end.x, end.y);
    return (
      <svg className="WireDragItem">
        <Wire startPos={startPos} endPos={endPos} />
      </svg>
    );
  }
}

export { WireDragItem };
