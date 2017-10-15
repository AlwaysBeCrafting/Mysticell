import classNames from "classnames";
import React from "react";

import { Dict } from "common/types";
import { graphLayoutWidth } from "common/utils";

import { Wire } from "components/atoms";

import { PRIMITIVES } from "data/common";
import { Edge, GraphNode, InnerNode } from "data/Graph";
import { GraphNodePrototype, NodePrototype } from "data/NodePrototype";

const nodeHeaderRows = 1;
const panelHeaderRows = 2;
const nodeWidth = 4;

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
        {Object.values(prototype.graph).map(this.renderNodeWires)}
      </svg>
    );
  }

  private renderNodeWires = (node: GraphNode) =>
    node.edges.map(this.renderWire(node.id));

  private renderWire = (source: string) => (edge: Edge) => {
    const { graph, layout } = this.props.prototype;
    const { target } = edge;
    const [srcIndex, tgtIndex] = edge.data;

    const srcPos: [number, number] = [0, 0];
    const dstPos: [number, number] = [0, 0];

    if (source === "input") {
      srcPos[1] += panelHeaderRows;
    } else {
      srcPos[0] += layout[source][0];
      srcPos[1] += layout[source][1];
      srcPos[0] += nodeWidth;
      srcPos[1] += nodeHeaderRows;
    }

    if (target === "output") {
      dstPos[0] = graphLayoutWidth(layout);
      dstPos[1] += panelHeaderRows;
    } else {
      dstPos[0] = layout[target][0];
      dstPos[1] = layout[target][1];
      dstPos[1] += nodeHeaderRows;
      const tgtNode = graph[target] as InnerNode;
      dstPos[1] += (PRIMITIVES[tgtNode.prototype] ||
        this.props.nodePrototypes[tgtNode.prototype]
      ).outputNames.length;
    }

    srcPos[1] += srcIndex;
    dstPos[1] += tgtIndex;

    return (
      <Wire
        srcPos={srcPos}
        dstPos={dstPos}
        key={`${source}@${srcIndex}-${target}@${tgtIndex}`}
      />
    );
  };
}

export { WireLayer };
