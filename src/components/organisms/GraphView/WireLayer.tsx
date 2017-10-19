import classNames from "classnames";
import React from "react";

import { Dict } from "common/types";
import { sourcePinPosition, targetPinPosition } from "common/utils";

import { Wire } from "components/atoms";

import { PRIMITIVES } from "data/common";
import { Edge, isBoundaryNode } from "data/Graph";
import { GraphNodePrototype, NodePrototype } from "data/NodePrototype";

interface Props {
  prototype: GraphNodePrototype;
  nodePrototypes: Dict<NodePrototype>;
  className?: string;
}

class WireLayer extends React.PureComponent<Props> {
  public render() {
    const { prototype, className } = this.props;
    return (
      <svg className={classNames("wireLayer", className)}>
        {Object.values(prototype.graph).map(node =>
          node.edges.map(this.renderWire(node.id)),
        )}
      </svg>
    );
  }

  private renderWire(source: string) {
    const { nodePrototypes, prototype } = this.props;
    const { graph, layout } = prototype;
    return (edge: Edge) => {
      const srcPos = sourcePinPosition(layout, source, edge.data[0]);

      const tgtNode = graph[edge.target];
      const offset =
        tgtNode && !isBoundaryNode(tgtNode)
          ? (PRIMITIVES[tgtNode.prototype] || nodePrototypes[tgtNode.prototype])
              .inputNames.length
          : 0;
      const dstPos = targetPinPosition(
        layout,
        offset,
        edge.target,
        edge.data[1],
      );
      return (
        <Wire
          srcPos={srcPos}
          tgtPos={dstPos}
          key={`${source}@${edge.data[0]}-${edge.target}@${edge.data[1]}`}
        />
      );
    };
  }
}

export { WireLayer };
