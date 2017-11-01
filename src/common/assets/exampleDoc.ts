const exampleDoc = {
  id: "document.0000",
  title: "Example Document",
  version: 0,
  include: [],
  sheets: {
    "sheet.0000": {
      id: "sheet.0000",
      title: "Sheet 1",
      size: { width: 16, height: 20 },
      cells: {
        "cell.0000": {
          id: "cell.0000",
          property: { id: "property.0001", type: "input", index: 0 },
        },
        "cell.0001": {
          id: "cell.0001",
          property: { id: "property.0001", type: "output", index: 0 },
        },
        "cell.0002": {
          id: "cell.0002",
          property: { id: "property.0001", type: "output", index: 1 },
        },
      },
      layout: {
        "cell.0000": { left: 0, top: 0, right: 2, bottom: 1 },
        "cell.0001": { left: 2, top: 0, right: 4, bottom: 1 },
        "cell.0002": { left: 2, top: 1, right: 4, bottom: 2 },
      },
    },
  },
  nodePrototypes: {
    "function.0000": {
      id: "function.0000",
      name: "Ability Mod",
      inputNames: ["Ability Score"],
      outputNames: ["Modifier"],
      graph: {
        input: {
          id: "input",
          edges: [{ target: "node.0000", pinIndex: { src: 0, dst: 0 } }],
        },
        "node.0000": {
          id: "node.0000",
          constants: ["0", "10"],
          prototype: "primitive.subtract",
          edges: [{ target: "node.0001", pinIndex: { src: 0, dst: 0 } }],
        },
        "node.0001": {
          id: "node.0001",
          constants: ["0", "2"],
          prototype: "primitive.divide",
          edges: [{ target: "node.0002", pinIndex: { src: 0, dst: 0 } }],
        },
        "node.0002": {
          id: "node.0002",
          constants: ["0"],
          prototype: "primitive.floor",
          edges: [{ target: "output", pinIndex: { src: 0, dst: 0 } }],
        },
      },
      layout: {
        "node.0000": { x: 2, y: 1 },
        "node.0001": { x: 8, y: 1 },
        "node.0002": { x: 14, y: 1 },
      },
    },
    "property.0001": {
      id: "property.0001",
      name: "Strength",
      inputNames: ["Strength"],
      outputNames: ["Strength", "Str Mod"],
      inputValues: ["15"],
      graph: {
        input: {
          id: "input",
          edges: [
            { target: "output", pinIndex: { src: 0, dst: 0 } },
            { target: "node.0003", pinIndex: { src: 0, dst: 0 } },
          ],
        },
        "node.0003": {
          id: "node.0003",
          constants: ["0"],
          prototype: "function.0000",
          edges: [{ target: "output", pinIndex: { src: 0, dst: 1 } }],
        },
      },
      layout: {
        "node.0003": { x: 2, y: 3 },
      },
    },
  },
  nav: {
    value: "root",
    children: [
      {
        value: "Abilities",
        children: [{ value: "function.0000" }, { value: "property.0001" }],
      },
    ],
  },
};

export { exampleDoc };
