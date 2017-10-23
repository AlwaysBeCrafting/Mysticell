import React from "react";

import { NodeView } from "components/molecules";

import { NodeInfo } from "data/common";

import { DragItem } from "./DragItem";
import "./NodeDragItem.scss";

interface Props {
  nodeInfo: NodeInfo;
}

class NodeDragItem extends DragItem<Props> {
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
