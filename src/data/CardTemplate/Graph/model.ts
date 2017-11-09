import { Map } from "immutable";

import { Graph, Position2d } from "common/types";

import { Card } from "data/Card";
import { Palette } from "data/Palette";

import { CardTemplate, CardTemplateProps } from "../model";

import { FunctionCardTemplate, isFunction } from "./Function/model";
import { isProperty, PropertyCardTemplate } from "./Property/model";

interface BoundaryNodeValue {
  type: "boundary";
  side: "input" | "output";
  index: number;
}
interface CardNodeValue {
  type: "card";
  side: "input" | "output";
  index: number;
  card: string;
}
type NodeValue = BoundaryNodeValue | CardNodeValue;
type EdgeValue = "external" | "internal";

type CardGraph = Graph<NodeValue, EdgeValue>;

interface GraphCardTemplateProps extends CardTemplateProps {
  cards: Map<string, Card>;
  graph: CardGraph;
}

interface GraphCardTemplateMethods {
  nodePosition(node: string, palette: Palette): Position2d;
  gridWidth(): number;
}

type GraphCardTemplate = FunctionCardTemplate | PropertyCardTemplate;

const isGraph = (
  template: CardTemplate | undefined,
): template is GraphCardTemplate =>
  isFunction(template) || isProperty(template);

function gridWidth(this: GraphCardTemplate): number {
  return this.cards.map(card => card.position.x).max()! + 4 + 2;
}

function nodePosition(
  this: GraphCardTemplate,
  nodeId: string,
  palette: Palette,
): Position2d {
  // return new Position2d();
  const node = this.graph.nodes.get(nodeId);
  if (!node) {
    return new Position2d();
  }
  if (node.type === "card") {
    const card = this.cards.get(node.card);
    if (!card) {
      return new Position2d();
    }
    const template = palette.getTemplate(card.template);
    if (node.side === "input") {
      const outputCount = template ? template.outputNames.size : 0;
      return new Position2d(
        card.position.x,
        card.position.y + outputCount + node.index + 1 + 0.5,
      );
    } else {
      return new Position2d(
        card.position.x + 4,
        card.position.y + node.index + 1 + 0.5,
      );
    }
  } else {
    if (node.side === "input") {
      return new Position2d(0, node.index + 0.5 + 2);
    } else {
      return new Position2d(this.gridWidth(), node.index + 0.5 + 2);
    }
  }
}

export {
  NodeValue,
  BoundaryNodeValue,
  CardNodeValue,
  EdgeValue,
  GraphCardTemplateProps,
  GraphCardTemplateMethods,
};
export { FunctionCardTemplate, PropertyCardTemplate, GraphCardTemplate };
export { CardGraph, isGraph };
export { gridWidth, nodePosition };
