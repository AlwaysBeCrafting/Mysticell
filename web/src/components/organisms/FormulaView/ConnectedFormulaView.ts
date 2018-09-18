import { List, Seq } from "immutable";
import { connect } from "react-redux";

import { CommonAttributes } from "common/types";

import { App } from "data/App";
import { Source } from "data/Source";

import { FormulaView, Props } from "./FormulaView";

type StateProps = Pick<Props, "source" | "nodeIds" | "wireIds" | "path">;
type DispatchProps = {};
type PassedProps = CommonAttributes;
type MergedProps = StateProps & DispatchProps & PassedProps;

interface ReduxProps {
  sourceId: string;
}
type PublicProps = PassedProps & ReduxProps;

const mapStateToProps = (state: App, props: PublicProps): StateProps => ({
  source: state.sources.getEntity(props.sourceId, new Source()),
  nodeIds: List(),
  wireIds: List(),
  path: Seq.Indexed(),
});

const mergeProps = (
  { source, nodeIds, wireIds, path }: StateProps,
  {  }: DispatchProps,
  { className }: PublicProps,
): MergedProps => ({ source, nodeIds, wireIds, path, className });

const ConnectedFormulaView = connect(
  mapStateToProps,
  {},
  mergeProps,
)(FormulaView);

export { ConnectedFormulaView };
