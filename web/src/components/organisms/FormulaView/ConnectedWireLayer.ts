import { Seq } from "immutable";
import { connect } from "react-redux";

import { Position2d, CommonAttributes } from "common/types";

import { App } from "data/App";

import { WireLayer, Props } from "./WireLayer";

type StateProps = Pick<Props, "wires" | "getTerminalPosition">;
type DispatchProps = {};
type PassedProps = CommonAttributes;
type MergedProps = StateProps & DispatchProps & PassedProps;

interface ReduxProps {
  sourceId: string;
}
type PublicProps = PassedProps & ReduxProps;

const mapStateToProps = (_: App, __: PublicProps): StateProps => ({
  wires: Seq.Indexed(),
  getTerminalPosition: () => new Position2d(0, 0),
});

const mergeProps = (
  { wires, getTerminalPosition }: StateProps,
  {  }: DispatchProps,
  { className }: PublicProps,
): MergedProps => ({ wires, getTerminalPosition, className });

const ConnectedWireLayer = connect(
  mapStateToProps,
  {},
  mergeProps,
)(WireLayer);

export { ConnectedWireLayer };
