import React from "react";

import { ConnectedNodeView } from "components/molecules";

import "./NodeDragItem.scss";

interface Props {
  nodeId: string;
}

const NodeDragItem = ({ nodeId }: Props) => (
  <ConnectedNodeView className="NodeDragItem" nodeId={nodeId} />
);

export { NodeDragItem };
