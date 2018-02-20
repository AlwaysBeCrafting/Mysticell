import { Graph } from "../Graph";

const smallGraph = Graph.from([["0", "zero"], ["1", "one"]], [["0", "1", "a"]]);
const largeGraph = Graph.from(
  [["0", "zero"], ["1", "one"], ["2", "two"], ["3", "three"]],
  [["0", "1", "a"], ["0", "2", "b"], ["1", "3", "c"], ["2", "3", "d"]],
);

describe("graph loading from primitive data", () => {
  it("preserves node counts", () => {
    expect(smallGraph.nodes.size).toBe(2);
    expect(largeGraph.nodes.size).toBe(4);
  });

  it("preserves edge counts", () => {
    expect(smallGraph.edges.size).toBe(1);
    expect(largeGraph.edges.size).toBe(4);
  });
});

describe("graph node neighbor functions", () => {
  it("returns one successor per outgoing edge", () => {
    expect(largeGraph.successors("0").size).toBe(2);
    expect(largeGraph.successors("1").size).toBe(1);
    expect(largeGraph.successors("2").size).toBe(1);
    expect(largeGraph.successors("3").size).toBe(0);
  });

  it("returns one predecessor per incoming edge", () => {
    expect(largeGraph.predecessors("0").size).toBe(0);
    expect(largeGraph.predecessors("1").size).toBe(1);
    expect(largeGraph.predecessors("2").size).toBe(1);
    expect(largeGraph.predecessors("3").size).toBe(2);
  });

  it("returns one neighbor per incoming or outging edge", () => {
    expect(largeGraph.neighbors("0").size).toBe(2);
    expect(largeGraph.neighbors("1").size).toBe(2);
    expect(largeGraph.neighbors("2").size).toBe(2);
    expect(largeGraph.neighbors("3").size).toBe(2);
  });
});

describe("graph topologic sort", () => {
  it("finishes without error", () => {
    expect(() => smallGraph.topoSort()).not.toThrow();
  });
});
