import React from "react";

import { Position2d } from "common/types";

import { NodeView } from "components/molecules";

import { NodeInfo } from "data/common";

import { DragItem } from "./DragItem";
import "./NodePrototypeDragItem.scss";

interface Props {
  nodeInfo: NodeInfo;
  currentOffset: Position2d;
}

class NodePrototypeDragItem extends DragItem<Props> {
  public render() {
    const { x, y } = this.props.currentOffset;
    const style = {
      transform: `translate(${x}px, ${y}px)`,
    };
    return (
      <NodeView
        className="nodePrototypeDragItem"
        nodeInfo={this.props.nodeInfo}
        position={new Position2d()}
        style={style}
      />
    );
  }
}

export { NodePrototypeDragItem };
