import { Seq } from "immutable";
import React from "react";

import { ConnectedNodeView } from "components/molecules";

import "./NodeLayer.scss";
import { CommonAttributes } from "common/types";

interface Props extends CommonAttributes {
  nodeIds: Iterable<string>;
}

const NodeLayer = ({ nodeIds }: Props) =>
  Seq.Indexed(nodeIds).map(nodeId => (
    <ConnectedNodeView key={nodeId} nodeId={nodeId} />
  ));

export { NodeLayer, Props };
