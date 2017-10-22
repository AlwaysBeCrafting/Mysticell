import classNames from "classnames";
import React from "react";
import { connect } from "react-redux";
import Redux from "redux";

import { Dict } from "common/types";

import { NodeView } from "components/molecules";

import { getNodeInfo } from "data/common";
import { isBoundaryNode } from "data/Graph";
import { GraphNodePrototype, NodePrototype } from "data/NodePrototype";

import "./NodeLayer.scss";

interface DispatchProps {
  dispatch: Redux.Dispatch<Redux.Action>;
}
interface OwnProps {
  prototype: GraphNodePrototype;
  nodePrototypes: Dict<NodePrototype>;
  className?: string;
}
type Props = DispatchProps & OwnProps;

class PartialNodeLayer extends React.PureComponent<Props> {
  public render() {
    const { prototype, className } = this.props;
    const formulaNodes = Object.keys(prototype.layout);

    return (
      <div className={classNames("nodeLayer", className)}>
        {formulaNodes.map(this.renderNode)}
      </div>
    );
  }

  private renderNode = (nodeId: string) => {
    const { prototype, nodePrototypes } = this.props;
    const { graph } = prototype;
    const node = graph[nodeId];

    if (isBoundaryNode(node)) {
      throw new Error(
        `Tried to render a boundary node in graph of ${prototype.id}`,
      );
    }

    const position = prototype.layout[nodeId] || { x: 0, y: 0 };

    return (
      <NodeView
        key={node.id}
        nodeInfo={getNodeInfo(nodePrototypes, prototype, node)}
        position={position}
        onUserValueChange={this.onUserValueChange}
      />
    );
  };

  private onUserValueChange = (
    prototypeId: string,
    nodeId: string,
    index: number,
    value: string,
  ) => {
    // tslint:disable-next-line:no-console
    console.log(prototypeId, nodeId, index, value);
  };
}

const NodeLayer = connect<{}, DispatchProps, OwnProps>(
  () => ({}),
  dispatch => ({ dispatch }),
)(PartialNodeLayer);

export { NodeLayer };
