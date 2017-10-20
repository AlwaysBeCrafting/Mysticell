import React from "react";

import { Position2d } from "common/types";

import "./NodeDragItem.scss";

interface Props {
  currentOffset: Position2d;
}

class NodeDragItem extends React.Component<Props> {
  public shouldComponentUpdate(nextProps: Props) {
    const { currentOffset: newOffset } = nextProps;
    const { currentOffset } = this.props;
    return (
      newOffset &&
      (newOffset.x !== currentOffset.x || newOffset.y !== currentOffset.y)
    );
  }

  public render() {
    const { x, y } = this.props.currentOffset;
    const style = {
      transform: `translate(${x}px, ${y}px)`,
    };
    return <div className="nodeDragItem" style={style} />;
  }
}

export { NodeDragItem };
