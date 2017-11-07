import { hash, List, Map, Record, Seq, Set, ValueObject } from "immutable";

import { Dict } from "common/types";

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

interface GraphProps<N, E = N> {
  nodes: Map<NodeIndex, N>;
  edges: Map<EdgeIndex, E>;
}

interface GraphMethods<N, E> {
  readonly order: number;
  readonly size: number;
  directSuccessors(node: NodeIndex): Set<NodeIndex>;
  directPredecessors(node: NodeIndex): Set<NodeIndex>;
  neighborhood(node: NodeIndex): Set<NodeIndex>;
  degree(node: NodeIndex): number;
  inDegree(node: NodeIndex): number;
  outDegree(node: NodeIndex): number;
  nodeValue(node: NodeIndex): N;
  edgeValue(source: NodeIndex, target: NodeIndex): E;
  addNode(id: NodeIndex, value: N): this;
  addNodes(nodes: Array<[NodeIndex, N]>): this;
  removeNode(id: NodeIndex): this;
  connectNodes(source: NodeIndex, target: NodeIndex, value: E): this;
  disconnectNodes(source: NodeIndex, target: NodeIndex): Graph<N, E>;
  findSources(): Seq.Set<NodeIndex>;
  findSinks(): Seq.Set<NodeIndex>;
  topoSort(): List<NodeIndex>;
  hasCycles(): boolean;
  serialize(): string;
}

interface SerializedGraph {
  nodes: Dict<string>;
  edges: Array<{ source: string; target: string; value: string }>;
}

class UntypedGraph<N, E = N> extends Record<GraphProps<any>>({
  nodes: Map(),
  edges: Map(),
}) implements GraphMethods<N, E> {
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

  nodeValue(node: NodeIndex): N {
    return this.getIn(["nodes", node]);
  }

  edgeValue(source: NodeIndex, target: NodeIndex): E {
    return this.getIn(["edges", List([source, target])]);
  }

  addNode(id: NodeIndex, value: N): this {
    return this.setIn(["nodes", id], value);
  }

  addNodes(nodes: Array<[NodeIndex, N]>): this {
    return this.mergeIn(["nodes"], nodes);
  }

  removeNode(id: NodeIndex): this {
    return this.removeIn(["nodes", id]);
  }

  connectNodes(source: NodeIndex, target: NodeIndex, value: E): this {
    return this.setIn(["edges", List([source, target])], value);
  }

  disconnectNodes(source: NodeIndex, target: NodeIndex): Graph<N, E> {
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

  serialize(
    serializeNode: (node: N) => string = JSON.stringify,
    serializeEdge: (edge: E) => string = JSON.stringify,
  ): string {
    return JSON.stringify(
      {
        nodes: this.nodes.map(n => serializeNode(n.value)).toJS(),
        edges: this.edges
          .map((value, { source, target }) => ({
            source,
            target,
            value: serializeEdge(value),
          }))
          .toList()
          .toArray(),
      },
      null,
      2,
    );
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

type Graph<N, E> = Readonly<GraphProps<N, E>> &
  GraphMethods<N, E> &
  Record<GraphProps<N, E>>;

function Graph<N, E>(values?: Partial<GraphProps<N, E>>): Graph<N, E> {
  return new UntypedGraph(values);
}

namespace Graph {
  export function deserialize<N, E>(
    json: string,
    deserializeNode: (node: string) => N = JSON.parse,
    deserializeEdge: (edge: string) => E = JSON.parse,
  ): Graph<N, E> {
    const serializedGraph: SerializedGraph = JSON.parse(json);
    return Graph.from(
      Object.entries(serializedGraph.nodes).map<[string, N]>(([id, value]) => [
        id,
        deserializeNode(value),
      ]),
      serializedGraph.edges.map<
        [string, string, E]
      >(({ source, target, value }) => [
        source,
        target,
        deserializeEdge(value),
      ]),
    );
  }

  export function from<N, E>(
    nodes: Array<[NodeIndex, N]>,
    edges: Array<[NodeIndex, NodeIndex, E]> = [],
  ): Graph<N, E> {
    return Graph<N, E>().withMutations(graph => {
      for (const [node, value] of nodes) {
        graph.addNode(node, value);
      }
      for (const [source, target, value] of edges) {
        graph.connectNodes(source, target, value);
      }
    });
  }
}

export { Graph };
