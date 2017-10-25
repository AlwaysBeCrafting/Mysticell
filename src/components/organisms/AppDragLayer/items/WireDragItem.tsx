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
  public render() {
    const start = { ...(this.props.start || this.props.currentOffset) };
    const end = { ...(this.props.end || this.props.currentOffset) };
    start.y -= 20;
    start.x /= 40;
    start.y /= 40;
    end.y -= 20;
    end.x /= 40;
    end.y /= 40;
    return (
      <svg className="wireDragItem">
        <Wire srcPos={start} tgtPos={end} />
      </svg>
    );
  }
}

export { WireDragItem };
