import { hash, List, Map, Record, Seq, Set, ValueObject } from "immutable";

type NodeIndex = string;

class EdgeIndex implements ValueObject {
  constructor(public source: NodeIndex, public target: NodeIndex) {}

  equals(other: EdgeIndex): boolean {
    return this.source === other.source && this.target === other.target;
  }

  hashCode(): number {
    let result = 17;
    result = result * 37 + hash(this.source);
    result = result * 37 + hash(this.target);
    return result;
  }
}

interface GraphProps<Tn, Te> {
  nodes: Map<NodeIndex, Tn>;
  edges: Map<EdgeIndex, Te>;
}

class Graph<Tn, Te = Tn> extends Record<GraphProps<Tn, Te>>({
  nodes: Map(),
  edges: Map(),
}) {
  get order() {
    return this.nodes.size;
  }

  get size() {
    return this.edges.size;
  }

  directSuccessors(node: NodeIndex): Set<NodeIndex> {
    return this.edges
      .keySeq()
      .filter(key => key.source === node)
      .map(key => key.source)
      .toSet();
  }

  directPredecessors(node: NodeIndex): Set<NodeIndex> {
    return this.edges
      .keySeq()
      .filter(key => key.target === node)
      .map(key => key.target)
      .toSet();
  }

  neighborhood(node: NodeIndex): Set<NodeIndex> {
    return this.edges
      .keySeq()
      .filter(key => key.source === node || key.target === node)
      .map(key => (key.source === node ? key.target : key.source))
      .toSet();
  }

  degree(node: NodeIndex): number {
    return this.edges
      .keySeq()
      .filter(key => key.source === node || key.target === node)
      .count();
  }

  inDegree(node: NodeIndex): number {
    return this.edges
      .keySeq()
      .filter(key => key.target === node)
      .count();
  }

  outDegree(node: NodeIndex): number {
    return this.edges
      .keySeq()
      .filter(key => key.source === node)
      .count();
  }

  nodeValue(node: NodeIndex): Tn {
    return this.getIn(["nodes", node]);
  }

  edgeValue(source: NodeIndex, target: NodeIndex): Te {
    return this.getIn(["edges", List([source, target])]);
  }

  addNode(id: NodeIndex, value: Tn): this {
    return this.setIn(["nodes", id], value);
  }

  addNodes(nodes: Array<[NodeIndex, Tn]>): this {
    return this.mergeIn(["nodes"], nodes);
  }

  removeNode(id: NodeIndex): this {
    return this.removeIn(["nodes", id]);
  }

  connectNodes(source: NodeIndex, target: NodeIndex, value: Te): this {
    return this.setIn(["edges", List([source, target])], value);
  }

  disconnectNodes(source: NodeIndex, target: NodeIndex): Graph<Tn, Te> {
    return this.removeIn(["edges", List([source, target])]);
  }

  findSources(): Seq.Set<NodeIndex> {
    return this.nodes
      .removeAll(this.edges.keySeq().map(edge => edge.target))
      .keySeq()
      .toSetSeq();
  }

  findSinks(): Seq.Set<NodeIndex> {
    return this.nodes
      .removeAll(this.edges.keySeq().map(edge => edge.source))
      .keySeq()
      .toSetSeq();
  }

  topoSort(): List<NodeIndex> {
    const result = this._topoSort();
    if (result.hasCycles) {
      throw new Error("Cannot topologically sort a graph that contains cycles");
    }
    return result.list;
  }

  hasCycles(): boolean {
    return this._topoSort().hasCycles;
  }

  private _topoSort(): { hasCycles: boolean; list: List<NodeIndex> } {
    let list: List<NodeIndex> = List();
    let sources = this.findSources().toSet();
    let edges = this.edges;
    while (!sources.isEmpty()) {
      const node = sources.first()!;
      sources = sources.remove(node);
      list = list.push(node);
      edges = edges.filter((_, edge) => edge.source !== node);
      this.directSuccessors(node).forEach(succ => {
        if (!edges.some((_, edge) => edge.target === succ)) {
          sources = sources.add(succ);
        }
      });
    }
    return { hasCycles: list.size !== this.nodes.size, list };
  }
}

export { Graph };
