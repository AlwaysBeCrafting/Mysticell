import { connect } from "react-redux";

import { CommonAttributes } from "common/types";

import { App } from "data/App";
import { Node } from "data/Node";
import { PRIMITIVE_SOURCES } from "data/Primitive";
import { Source } from "data/Source";

import { NodeView, Props } from "./NodeView";

type StateProps = Pick<Props, "node" | "source" | "isDragging" | "connections">;
type DispatchProps = {};
type PassedProps = CommonAttributes;
type MergedProps = StateProps & DispatchProps & PassedProps;

interface ReduxProps {
  nodeId: string;
}
type PublicProps = PassedProps & ReduxProps;

const mapStateToProps = (state: App, props: PublicProps): StateProps => {
  const node = state.nodes.getEntity(props.nodeId, new Node());
  return {
    node,
    source: state.sources.entities
      .concat(PRIMITIVE_SOURCES)
      .get(node.source, new Source()),
    isDragging: false,
    connections: [],
  };
};

const mergeProps = (
  { node, source, isDragging, connections }: StateProps,
  {  }: DispatchProps,
  { className }: PublicProps,
): MergedProps => ({ node, source, isDragging, connections, className });

const ConnectedNodeView = connect(
  mapStateToProps,
  {},
  mergeProps,
)(NodeView);

export { ConnectedNodeView };
