import { List, Map, Repeat, Set } from "immutable";

import {
  CardGraph,
  GraphCardTemplate,
  isGraph,
  isPrimitive,
  isProperty,
  isTable,
} from "data/CardTemplate";
import { Param, PARAMS } from "data/common";
import { Palette } from "data/Palette";

const orderNodesByIndex = (graph: CardGraph) => (a: string, b: string) => {
  const nodeA = graph.nodes.get(a[0]);
  const nodeB = graph.nodes.get(b[0]);
  return (nodeA ? nodeA.index : 0) - (nodeB ? nodeB.index : 0);
};

function resolveGraph(
  template: GraphCardTemplate,
  palette: Palette,
  params: List<Param> = List(),
  history: Set<string> = Set(),
): List<Param> {
  if (history.contains(template.id)) {
    return Repeat(
      PARAMS.error(
        "CYCLE",
        `The graph of "${template.name}" references itself`,
      ),
      template.outputNames.size,
    ).toList();
  }

  const byIndex = orderNodesByIndex(template.graph);

  const args = isProperty(template)
    ? template.inputValues.map(PARAMS.string)
    : params;

  const sortedNodes = template.graph.topoSort();
  if (!sortedNodes) {
    return Repeat(
      PARAMS.error("CYCLE", `The graph of "${template.name}" has a cycle`),
      template.outputNames.size,
    ).toList();
  }

  const resolvedNodes = sortedNodes
    .map(([k]) => k)
    // Apply node values
    .reduce((nodeValues: Map<string, Param>, nodeId) => {
      if (nodeValues.has(nodeId)) {
        return nodeValues;
      }

      const node = template.graph.nodes.get(nodeId);
      if (!node) {
        return nodeValues.set(
          nodeId,
          PARAMS.error(
            "EVAL",
            `Missing node ${nodeId} in graph of ${template.id}`,
          ),
        );
      }

      // Wires simply move values from one node to another; if a node is at
      // the "end" of a wire, it receives the value its predecessor holds.
      // If it is disconnected, it uses the value from its card, or remains
      // blank if there is none.
      if (node.wireAnchor === "end") {
        const pre = template.graph.predecessors(nodeId).keySeq();
        if (pre.isEmpty()) {
          if (node.type === "boundary") {
            return nodeValues.set(nodeId, PARAMS.empty());
          } else {
            const card = template.cards.get(node.card)!;
            return nodeValues.set(
              nodeId,
              PARAMS.string(card.values.get(node.index)!),
            );
          }
        } else {
          return nodeValues.set(
            nodeId,
            nodeValues.get(
              pre.first()!,
              PARAMS.error(
                "EVAL",
                `Didn't get predecessor value for node ${nodeId}`,
              ),
            ),
          );
        }
      }

      // Nodes at the "start" end of a wire need to supply a value
      switch (node.type) {
        case "boundary": {
          return nodeValues.set(
            nodeId,
            args.get(
              node.index,
              PARAMS.error(
                "INPUT",
                `No input value available at index ${node.index}`,
              ),
            ),
          );
        }
        default: {
          const cardTemplate = palette.getTemplate(
            template.cards.get(node.card)!.template,
          );

          const pre = template.graph.predecessors(nodeId);

          const cardParams = pre.sortBy((_, k) => k, byIndex).toList();
          const cardOutputNodes = template.graph
            .successors(pre.keySeq().first()!)
            .sortBy((_, k) => k, byIndex)
            .toIndexedSeq();

          if (isGraph(cardTemplate)) {
            return nodeValues.merge<string, Param>(
              cardOutputNodes.zip(
                resolveGraph(
                  cardTemplate,
                  palette,
                  cardParams,
                  history.add(template.id),
                ),
              ),
            );
          }

          if (isTable(cardTemplate)) {
            return nodeValues.set(
              nodeId,
              PARAMS.error("TODO", "Table lookup is not yet implemented"),
            );
          }

          if (isPrimitive(cardTemplate)) {
            return nodeValues.merge<string, Param>(
              cardOutputNodes.zip(cardTemplate.evaluate(cardParams)),
            );
          }

          // Somehow, none of the above have applied
          return nodeValues.set(
            nodeId,
            PARAMS.error(
              "UH-OH",
              `Card ${node.card} has an unknown template type`,
            ),
          );
        }
      }
    }, Map<string, Param>());

  return resolvedNodes
    .filter((_, nodeId) => {
      const node = template.graph.nodes.get(nodeId);
      return !!node && node.type === "boundary" && node.wireAnchor === "end";
    })
    .entrySeq()
    .sortBy(entry => entry[0], byIndex)
    .map(entry => entry[1])
    .toList();
}

export { resolveGraph };
