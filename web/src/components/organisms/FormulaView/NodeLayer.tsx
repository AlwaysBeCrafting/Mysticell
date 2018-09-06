import { Seq } from "immutable";
import React from "react";
import { connect } from "react-redux";

import { NodeView } from "components/molecules";

import { AppState } from "data/AppState";

import "./NodeLayer.scss";

interface StateProps {
  nodeIds: Iterable<string>;
}

interface OwnProps {
  sourceId: string;
  className?: string;
}
type Props = StateProps & OwnProps;

class PartialNodeLayer extends React.PureComponent<Props> {
  render() {
    const { nodeIds } = this.props;
    return Seq.Indexed(nodeIds).map(nodeId => (
      <NodeView key={nodeId} nodeId={nodeId} />
    ));
  }
}

const mapStateToProps = (state: AppState, props: OwnProps): StateProps => ({
  nodeIds: state.entities.nodeSources
    .filter(sourceId => sourceId === props.sourceId)
    .keySeq(),
});

const NodeLayer = connect<StateProps, {}, OwnProps>(mapStateToProps)(
  PartialNodeLayer,
);

export { NodeLayer };
