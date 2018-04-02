import classnames from "classnames";
import { Collection, Seq } from "immutable";
import React from "react";
import { Icon } from "react-atoms";
import { connect as connectStore } from "react-redux";

import { ToolButton } from "components/atoms";
import { ErrorBoundary, Toolbar } from "components/molecules";

import { AppState } from "data/AppState";
import { bindPathFromId } from "data/EntityState";
import { Source } from "data/Source";

import { Boundary } from "./Boundary";
import { NodeLayer } from "./NodeLayer";
import { WireLayer } from "./WireLayer";

import "./FormulaView.scss";

interface StateProps {
  source: Source;
  nodeIds: Seq.Indexed<string>;
  wireIds: Seq.Indexed<string>;
  pathFromId: (id: string) => Iterable<string> | undefined;
}

interface OwnProps {
  className?: string;
  sourceId: string;
}

type Props = StateProps & OwnProps;

const noop = () => undefined;

class PartialFormulaView extends React.PureComponent<Props> {
  wrapper: HTMLDivElement | null = null;

  render() {
    const { className, source, pathFromId } = this.props;
    const path = Seq(pathFromId(source.id) || []);
    return (
      <div className={classnames("formulaView", className)}>
        <Toolbar className="formulaView-toolbar">
          <ToolButton link to="/">
            <Icon name="close" />
          </ToolButton>
          {path.map(this.renderPathSegment(path))}
        </Toolbar>
        <div className="formulaView-graph">
          <ErrorBoundary>
            <Boundary input source={source} onValueChange={noop} />
          </ErrorBoundary>
          {this.renderGrid()}
          <ErrorBoundary>
            <Boundary output source={source} />
          </ErrorBoundary>
        </div>
      </div>
    );
  }

  private renderGrid() {
    const { sourceId } = this.props;
    return (
      <div
        className="formulaView-graph-grid"
        ref={elem => (this.wrapper = elem)}
      >
        <WireLayer
          className="formulaView-graph-grid-wires"
          sourceId={sourceId}
        />
        <NodeLayer
          className="formulaView-graph-grid-nodes"
          sourceId={sourceId}
        />
      </div>
    );
  }

  private renderPathSegment = (path: Collection.Indexed<string>) => (
    segment: string,
    i: number,
  ) => (
    <span
      key={i}
      className={classnames("formulaView-toolbar-path-segment", {
        "mod-final": i === path.count() - 1,
      })}
    >
      {segment}
    </span>
  );
}

const mapStateToProps = (state: AppState, props: OwnProps): StateProps => ({
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
  pathFromId: bindPathFromId(
    state.entities.directories.toSeq().concat(state.entities.sources),
    state.entities.entityParents,
  ),
});

const FormulaView = connectStore<StateProps, {}, OwnProps, AppState>(
  mapStateToProps,
)(PartialFormulaView);

export { FormulaView };
