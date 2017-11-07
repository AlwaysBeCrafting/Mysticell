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
