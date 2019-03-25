import React from "react";

import { NodeView } from "components/molecules";

import "./NodeDragItem.scss";

interface Props {
  nodeId: string;
}

const NodeDragItem = ({ nodeId }: Props) => (
  <NodeView
    className="NodeDragItem"
    nodeId={nodeId}
    isDragging={true}
    connections={[]}
  />
);

export { NodeDragItem };
