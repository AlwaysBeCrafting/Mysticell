import React from "react";

import { NodeView } from "components/molecules";

import "./NodeLayer.scss";
import { CommonAttributes } from "common/types";
import { useNodeList } from "data/Node";

interface Props extends CommonAttributes {
  formulaId: string;
}

const NodeLayer = ({ formulaId }: Props) => {
  const [nodes] = useNodeList(formulaId);
  return (
    <>
      {nodes.toIndexedSeq().map(node => (
        <NodeView
          key={node.id}
          nodeId={node.id}
          isDragging={false}
          connections={[]}
        />
      ))}
    </>
  );
};

export { NodeLayer, Props };
