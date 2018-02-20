import { List, Map } from "immutable";

import { Graph } from "common/types";

import { Card } from "data/Card";

import { GraphCardTemplateJs, PropertyCardTemplate } from "./Graph";
import { GraphJs } from "./Graph/js";
import {
  CardGraph,
  EdgeValue,
  FunctionCardTemplate,
  GraphCardTemplate,
  NodeValue,
} from "./Graph/model";

import { PropertyCardTemplateJs } from "./Graph/Property";
import { CardTemplateJs } from "./js";
import { PrimitiveCardTemplate } from "./Primitive";
import { TableCardTemplate } from "./Table";

interface CardTemplateProps {
  id: string;
  name: string;
  inputNames: List<string>;
  outputNames: List<string>;
}

type CardTemplate =
  | PrimitiveCardTemplate
  | GraphCardTemplate
  | TableCardTemplate;

namespace CardTemplate {
  function graphFromJs(graph: GraphJs): CardGraph {
    return Graph<NodeValue, EdgeValue>().withMutations(newGraph => {
      newGraph.set("nodes", Map(graph.nodes));
      for (const edge of graph.edges) {
        newGraph.connectNodes(edge.source, edge.target, "external");
      }
      newGraph.nodes
        .toSeq()
        .filter(node => node.type === "card" && node.wireAnchor === "end")
        .groupBy(node => node.type === "card" && node.card)
        .forEach((cardInputs, card) =>
          cardInputs.forEach((_, inputId) =>
            newGraph.nodes
              .filter(
                node =>
                  node.type === "card" &&
                  node.card === card &&
                  node.wireAnchor === "start",
              )
              .forEach((__, outputId) =>
                newGraph.connectNodes(inputId, outputId, "internal"),
              ),
          ),
        );
    });
  }

  export function fromJs(js: CardTemplateJs): CardTemplate {
    switch (js.id.split(".")[1]) {
      case "function": {
        const {
          id,
          name,
          inputNames,
          outputNames,
          cards,
          graph,
        } = js as GraphCardTemplateJs;
        return new FunctionCardTemplate({
          id,
          name,
          inputNames: List(inputNames),
          outputNames: List(outputNames),
          cards: Map(cards).map(Card.fromJs),
          graph: graphFromJs(graph),
        });
      }
      case "property": {
        const {
          id,
          name,
          inputNames,
          inputValues,
          outputNames,
          cards,
          graph,
        } = js as PropertyCardTemplateJs;
        return new PropertyCardTemplate({
          id,
          name,
          inputNames: List(inputNames),
          inputValues: List(inputValues),
          outputNames: List(outputNames),
          cards: Map(cards).map(Card.fromJs),
          graph: graphFromJs(graph),
        });
      }
      default: {
        throw new Error(`Invalid card template ID ${js.id}`);
      }
    }
  }
}

export { CardTemplateProps, CardTemplate };
