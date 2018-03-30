import classNames from "classnames";
import { Seq } from "immutable";
import React from "react";
import { connect } from "react-redux";

import { AppState } from "data/AppState";
import { Node } from "data/Node";
import { Wire } from "data/Wire";

import "./NodeLayer.scss";

const listConnectedInputs = (
  wires: Seq.Indexed<Wire>,
  node: Node,
): Seq.Set<number> => {
  return wires
    .filter(wire => wire.end.id === node.id)
    .map(wire => wire.end.index)
    .toSetSeq();
};

interface StateProps {
  nodes: Seq.Indexed<Node>;
}

interface OwnProps {
  sourceId: string;
  className?: string;
}
type Props = StateProps & OwnProps;

// FIXME: This gets its own molecule
const NodeView = () => <div className="dummyNode">Fix nodes!</div>;

class PartialNodeLayer extends React.PureComponent<Props> {
  render() {
    const { nodes, className } = this.props;
    return (
      <div className={classNames("nodeLayer", className)}>
        {nodes.map((node: Node) => <NodeView key={node.id} />)}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState, props: OwnProps): StateProps => ({
  nodes: state.entities.nodeSources
    .filter(sourceId => sourceId === props.sourceId)
    .map((_, nodeId) => state.entities.nodes.get(nodeId, new Node()))
    .toIndexedSeq(),
});

const NodeLayer = connect<StateProps, {}, OwnProps>(mapStateToProps)(
  PartialNodeLayer,
);

export { NodeLayer };
