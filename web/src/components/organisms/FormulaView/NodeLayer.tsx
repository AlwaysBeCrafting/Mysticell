import { Seq } from "immutable";
import React from "react";

import { ConnectedNodeView } from "components/molecules";

import "./NodeLayer.scss";
import { CommonAttributes } from "common/types";

interface Props extends CommonAttributes {
  nodeIds: Iterable<string>;
}

class NodeLayer extends React.PureComponent<Props> {
  render() {
    const { nodeIds } = this.props;
    return Seq.Indexed(nodeIds).map(nodeId => (
      <ConnectedNodeView key={nodeId} nodeId={nodeId} />
    ));
  }
}

export { NodeLayer, Props };
