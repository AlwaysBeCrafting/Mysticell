import { List } from "immutable";
import { connect } from "react-redux";

import { CommonAttributes } from "common/types";

import { App } from "data/App";

import { NodeLayer, Props } from "./NodeLayer";

type StateProps = Pick<Props, "nodeIds">;
type DispatchProps = {};
type PassedProps = CommonAttributes;
type MergedProps = StateProps & DispatchProps & PassedProps;

interface ReduxProps {
  sourceId: string;
}
type PublicProps = PassedProps & ReduxProps;

const mapStateToProps = (_: App, __: PublicProps): StateProps => ({
  nodeIds: List(),
});

const mergeProps = (
  { nodeIds }: StateProps,
  {  }: DispatchProps,
  { className }: PublicProps,
): MergedProps => ({ nodeIds, className });

const ConnectedNodeLayer = connect(
  mapStateToProps,
  {},
  mergeProps,
)(NodeLayer);

export { ConnectedNodeLayer };
