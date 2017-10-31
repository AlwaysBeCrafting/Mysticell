import classNames from "classnames";
import { Map } from "immutable";
import React from "react";
import { connect } from "react-redux";
import Redux from "redux";

import { Position2d } from "common/types";

import { NodeView } from "components/molecules";

import { nodeInfoFromNode } from "data/common";
import { isInnerNode } from "data/Graph";
import {
  connectNodes,
  GraphNodePrototype,
  NodePrototype,
} from "data/NodePrototype";

import "./NodeLayer.scss";

interface DispatchProps {
  dispatch: Redux.Dispatch<Redux.Action>;
}
interface OwnProps {
  prototype: GraphNodePrototype;
  nodePrototypes: Map<string, NodePrototype>;
  className?: string;
}
type Props = DispatchProps & OwnProps;

class PartialNodeLayer extends React.PureComponent<Props> {
  public render() {
    const { prototype, className } = this.props;

    return (
      <div className={classNames("nodeLayer", className)}>
        {prototype.layout.keySeq().map(this.renderNode)}
      </div>
    );
  }

  private renderNode = (nodeId: string) => {
    const { prototype, nodePrototypes } = this.props;
    const { graph } = prototype;
    const node = graph.get(nodeId);

    if (!isInnerNode(node)) {
      throw new Error(
        `Tried to render a non-inner node "${nodeId}" in graph of "${prototype.id}"`,
      );
    }

    const position = prototype.layout.get(nodeId) || new Position2d();

    return (
      <NodeView
        key={node.id}
        nodeInfo={nodeInfoFromNode(nodePrototypes, prototype, node)}
        position={position}
        onUserValueChange={this.onUserValueChange}
        onConnect={this.onConnect}
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

  private onConnect = (
    prototypeId: string,
    fromId: string,
    fromIndex: number,
    toId: string,
    toIndex: number,
  ) => {
    this.props.dispatch(
      connectNodes(prototypeId, fromId, fromIndex, toId, toIndex),
    );
  };
}

const NodeLayer = connect<{}, DispatchProps, OwnProps>(
  () => ({}),
  dispatch => ({ dispatch }),
)(PartialNodeLayer);

export { NodeLayer };
