import { Dict } from "common/types";

import { CardJs } from "data/Card";

import { CommonCardTemplateJs } from "../js";

import { FunctionCardTemplateJs } from "./Function";
import { PropertyCardTemplateJs } from "./Property";

interface BoundaryNodeJs {
  type: "boundary";
  side: "input" | "output";
  index: number;
}

interface CardNodeJs {
  type: "card";
  side: "input" | "output";
  index: number;
  card: string;
}
type NodeJs = BoundaryNodeJs | CardNodeJs;

interface GraphJs {
  nodes: Dict<NodeJs>;
  edges: Array<{ source: string; target: string }>;
}

interface CommonGraphCardTemplateJs extends CommonCardTemplateJs {
  cards: Dict<CardJs>;
  graph: GraphJs;
}

type GraphCardTemplateJs = FunctionCardTemplateJs | PropertyCardTemplateJs;

export {
  GraphJs,
  CommonGraphCardTemplateJs,
  GraphCardTemplateJs,
  FunctionCardTemplateJs,
  PropertyCardTemplateJs,
};
