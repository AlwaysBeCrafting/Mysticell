import { DocumentJs } from "data/Document";

const exampleDoc: DocumentJs = {
  id: "document.0",
  title: "Example Document",
  version: 0,
  include: [],
  sheets: {
    "sheet.0": {
      id: "sheet.0",
      title: "Example Sheet",
      size: { width: 16, height: 20 },
      cells: {
        "cell.0": {
          id: "cell.0",
          property: "template.property.1",
          node: "10",
          rect: { left: 0, top: 0, right: 2, bottom: 1 },
        },
        "cell.1": {
          id: "cell.1",
          property: "template.property.1",
          node: "13",
          rect: { left: 2, top: 0, right: 4, bottom: 1 },
        },
        "cell.2": {
          id: "cell.2",
          property: "template.property.1",
          node: "14",
          rect: { left: 2, top: 1, right: 4, bottom: 2 },
        },
      },
    },
  },
  palette: {
    documentTree: {
      value: { type: "group", name: "" },
      children: [
        {
          value: { type: "group", name: "Abilities" },
          children: [
            { value: { type: "item", template: "template.function.0" } },
            { value: { type: "item", template: "template.property.1" } },
          ],
        },
      ],
    },
    templates: {
      "template.function.0": {
        id: "template.function.0",
        name: "Ability Mod",
        inputNames: ["Ability Score"],
        outputNames: ["Modifier"],
        graph: {
          nodes: {
            "0": { type: "boundary", side: "input", index: 0 },
            "1": { type: "card", card: "card.0", side: "input", index: 0 },
            "2": { type: "card", card: "card.0", side: "input", index: 1 },
            "3": { type: "card", card: "card.0", side: "output", index: 0 },
            "4": { type: "card", card: "card.1", side: "input", index: 0 },
            "5": { type: "card", card: "card.1", side: "input", index: 1 },
            "6": { type: "card", card: "card.1", side: "output", index: 0 },
            "7": { type: "card", card: "card.2", side: "input", index: 0 },
            "8": { type: "card", card: "card.2", side: "output", index: 0 },
            "9": { type: "boundary", side: "output", index: 0 },
          },
          edges: [
            { source: "0", target: "1" },
            { source: "3", target: "4" },
            { source: "6", target: "7" },
            { source: "8", target: "9" },
          ],
        },
        cards: {
          "card.0": {
            id: "card.0",
            template: "template.primitive.subtract",
            values: ["", "10"],
            position: { x: 2, y: 1 },
          },
          "card.1": {
            id: "card.1",
            template: "template.primitive.divide",
            values: ["", "2"],
            position: { x: 8, y: 1 },
          },
          "card.2": {
            id: "card.2",
            template: "template.primitive.floor",
            values: [""],
            position: { x: 14, y: 1 },
          },
        },
      },
      "template.property.1": {
        id: "template.property.1",
        name: "Strength",
        inputNames: ["Strength"],
        outputNames: ["Strength", "Str Mod"],
        inputValues: ["15"],
        graph: {
          nodes: {
            "10": { type: "boundary", side: "input", index: 0 },
            "11": { type: "card", card: "card.3", side: "input", index: 0 },
            "12": { type: "card", card: "card.3", side: "output", index: 0 },
            "13": { type: "boundary", side: "output", index: 0 },
            "14": { type: "boundary", side: "output", index: 1 },
          },
          edges: [
            { source: "10", target: "13" },
            { source: "10", target: "11" },
            { source: "12", target: "14" },
          ],
        },
        cards: {
          "card.3": {
            id: "card.3",
            template: "template.function.0",
            values: [""],
            position: { x: 2, y: 3 },
          },
        },
      },
    },
  },
};

export { exampleDoc };
