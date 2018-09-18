import React from "react";

import { ConnectedNodeView } from "components/molecules";

import { DragItem } from "./DragItem";
import "./NodeDragItem.scss";

interface Props {
  nodeId: string;
}

class NodeDragItem extends DragItem<Props> {
  render() {
    return (
      <ConnectedNodeView className="NodeDragItem" nodeId={this.props.nodeId} />
    );
  }
}

export { NodeDragItem };
