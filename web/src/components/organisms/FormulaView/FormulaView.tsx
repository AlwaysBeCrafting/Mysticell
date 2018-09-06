import classnames from "classnames";
import { Seq } from "immutable";
import React from "react";
import { Icon } from "react-atoms";
import { connect as connectStore } from "react-redux";
import { RouteComponentProps, Route } from "react-router";

import { ToolButton } from "components/atoms";
import { ErrorBoundary, Toolbar } from "components/molecules";

import { AppState } from "data/AppState";
import { bindPathFromId } from "data/EntityState";
import { Source } from "data/Source";

import { Boundary } from "./Boundary";
import { NodeLayer } from "./NodeLayer";
import { WireLayer } from "./WireLayer";

import "./FormulaView.scss";

type RouteProps = RouteComponentProps<{ documentId: string; path: string }>;

interface StateProps {
  source: Source;
  nodeIds: Iterable<string>;
  wireIds: Iterable<string>;
  path: Seq.Indexed<string>;
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
    const { className, source, sourceId, path } = this.props;
    return (
      <div className={classnames("formulaView", className)}>
        <Toolbar className="formulaView-toolbar">
          <Route path="/:documentId" render={this.renderCloseButton} />
          {path.map(this.renderPathSegment(path))}
        </Toolbar>
        <div className="formulaView-graph">
          <ErrorBoundary>
            <Boundary
              className="formulaView-graph-boundary mod-input"
              input
              source={source}
              onValueChange={noop}
            />
          </ErrorBoundary>
          <ErrorBoundary>
            <Boundary
              className="formulaView-graph-boundary mod-output"
              output
              source={source}
            />
          </ErrorBoundary>
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
        </div>
      </div>
    );
  }

  private renderCloseButton = (routeProps: RouteProps) => (
    <ToolButton link to={`/${routeProps.match.params.documentId}`}>
      <Icon name="close" />
    </ToolButton>
  );

  private renderPathSegment = (path: Iterable<string>) => (
    segment: string,
    i: number,
  ) => (
    <span
      key={i}
      className={classnames("formulaView-toolbar-path-segment", {
        "mod-final": i === Seq.Indexed(path).count() - 1,
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
  path: Seq.Indexed(
    bindPathFromId(
      state.entities.directories.toSeq().concat(state.entities.sources),
      state.entities.entityParents,
    )(props.sourceId) || [],
  ),
});

const FormulaView = connectStore<StateProps, {}, OwnProps, AppState>(
  mapStateToProps,
)(PartialFormulaView);

export { FormulaView };
