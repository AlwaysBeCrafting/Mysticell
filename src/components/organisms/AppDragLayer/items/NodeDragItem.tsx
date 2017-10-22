import React from "react";

import { NodeView } from "components/molecules";

import { Position2d } from "common/types";

import { NodeInfo } from "data/common";

import "./NodeDragItem.scss";

interface Props {
  nodeInfo: NodeInfo;
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
    return (
      <NodeView
        className="nodeDragItem"
        nodeInfo={this.props.nodeInfo}
        position={{ x: 0, y: 0 }}
        style={style}
      />
    );
  }
}

export { NodeDragItem };
