import { Seq } from "immutable";
import { connect } from "react-redux";

import { CommonAttributes } from "common/types";

import { AppState } from "data/AppState";
import { bindPathFromId } from "data/EntityState";
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

const mapStateToProps = (state: AppState, props: PublicProps): StateProps => ({
  source: state.entities.sources.get(props.sourceId, new Source()),
  nodeIds: state.entities.nodeSources
    .toSeq()
    .filter(sourceId => sourceId === props.sourceId)
    .map((_, nodeId) => nodeId)
    .toIndexedSeq(),
  wireIds: state.entities.wireSources
    .toSeq()
    .filter(sourceId => sourceId === props.sourceId)
    .map((_, wireId) => wireId)
    .toIndexedSeq(),
  path: Seq.Indexed(
    bindPathFromId(
      state.entities.directories.toSeq().concat(state.entities.sources),
      state.entities.entityParents,
    )(props.sourceId) || [],
  ),
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
