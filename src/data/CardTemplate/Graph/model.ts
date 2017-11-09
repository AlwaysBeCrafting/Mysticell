import { Map } from "immutable";

import { Graph, Position2d } from "common/types";

import { Card } from "data/Card";
import { Palette } from "data/Palette";

import { CardTemplate, CardTemplateProps } from "../model";

import { FunctionCardTemplate, isFunction } from "./Function/model";
import { isProperty, PropertyCardTemplate } from "./Property/model";

interface BoundaryNodeValue {
  type: "boundary";
  wireAnchor: "start" | "end";
  index: number;
}
interface CardNodeValue {
  type: "card";
  wireAnchor: "start" | "end";
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

type GraphCardTemplate = FunctionCardTemplate | PropertyCardTemplate;

const isGraph = (
  template: CardTemplate | undefined,
): template is GraphCardTemplate =>
  isFunction(template) || isProperty(template);

function gridWidth(template: GraphCardTemplate): number {
  return template.cards.map(card => card.position.x).max()! + 4 + 2;
}

function nodePosition(
  hostTemplate: GraphCardTemplate,
  nodeId: string,
  palette: Palette,
): Position2d {
  // tslint:disable:no-console
  console.log(nodeId);
  console.log(hostTemplate.id);
  const node = hostTemplate.graph.nodes.get(nodeId)!;
  if (node.type === "card") {
    const card = hostTemplate.cards.get(node.card)!;
    const template = palette.getTemplate(card.template);
    if (node.wireAnchor === "start") {
      return new Position2d(
        card.position.x + 4,
        card.position.y + node.index + 1 + 0.5,
      );
    } else {
      const outputCount = template ? template.outputNames.size : 0;
      return new Position2d(
        card.position.x,
        card.position.y + outputCount + node.index + 1 + 0.5,
      );
    }
  } else {
    if (node.wireAnchor === "start") {
      return new Position2d(0, node.index + 0.5 + 2);
    } else {
      return new Position2d(gridWidth(hostTemplate), node.index + 0.5 + 2);
    }
  }
}

export {
  NodeValue,
  BoundaryNodeValue,
  CardNodeValue,
  EdgeValue,
  GraphCardTemplateProps,
};
export { FunctionCardTemplate, PropertyCardTemplate, GraphCardTemplate };
export { CardGraph, isGraph };
export { gridWidth, nodePosition };
