import classNames from "classnames";
import { Map } from "immutable";
import React from "react";

import { sourcePinPosition, targetPinPosition } from "common/utils";

import { Wire } from "components/atoms";

import { PRIMITIVES } from "data/common";
import { Edge, isBoundaryNode } from "data/Graph";
import { GraphNodePrototype, NodePrototype } from "data/NodePrototype";

interface Props {
  prototype: GraphNodePrototype;
  nodePrototypes: Map<string, NodePrototype>;
  className?: string;
}

class WireLayer extends React.PureComponent<Props> {
  public render() {
    const { prototype, className } = this.props;
    return (
      <svg className={classNames("wireLayer", className)}>
        {prototype.graph
          .toList()
          .map(node => node.edges.map(this.renderWire(node.id)))}
      </svg>
    );
  }

  private renderWire(source: string) {
    const { nodePrototypes, prototype } = this.props;
    const { graph, layout } = prototype;
    return (edge: Edge) => {
      const srcPos = sourcePinPosition(layout, source, edge.index.src);
      const tgtNode = graph.get(edge.target);
      const offset =
        tgtNode && !isBoundaryNode(tgtNode)
          ? (PRIMITIVES[tgtNode.prototype] ||
              nodePrototypes.get(tgtNode.prototype)
            ).outputNames.size
          : 0;
      const dstPos = targetPinPosition(
        layout,
        offset,
        edge.target,
        edge.index.dst,
      );
      return (
        <Wire
          srcPos={srcPos}
          tgtPos={dstPos}
          key={`${source}@${edge.index.src}-${edge.target}@${edge.index.dst}`}
        />
      );
    };
  }
}

export { WireLayer };
