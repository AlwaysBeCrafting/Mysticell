import React from "react";

import { NodeView } from "components/molecules";

import { DragItem } from "./DragItem";
import "./NodeDragItem.scss";

interface Props {
  nodeId: string;
}

class NodeDragItem extends DragItem<Props> {
  render() {
    const { x, y } = this.props.currentOffset;
    const style = {
      transform: `translate(${x}px, ${y}px)`,
    };
    return (
      <NodeView
        className="nodeDragItem"
        nodeId={this.props.nodeId}
        style={style}
      />
    );
  }
}

export { NodeDragItem };
