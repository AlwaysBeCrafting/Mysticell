import classNames from "classnames";
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
    const { nodeIds, className } = this.props;
    return (
      <div className={classNames("nodeLayer", className)}>
        {Seq.Indexed(nodeIds).map(nodeId => (
          <NodeView key={nodeId} nodeId={nodeId} />
        ))}
      </div>
    );
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
