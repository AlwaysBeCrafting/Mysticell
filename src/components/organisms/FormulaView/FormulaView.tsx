import classnames from "classnames";
import { Seq } from "immutable";
import React from "react";
import { Icon } from "react-atoms";
import { connect as connectStore } from "react-redux";

import { ToolButton } from "components/atoms";
import { ErrorBoundary, Toolbar } from "components/molecules";

import { AppState } from "data/AppState";
import { Source } from "data/Source";

import { Boundary } from "./Boundary";
import { NodeLayer } from "./NodeLayer";
import { WireLayer } from "./WireLayer";

import "./FormulaView.scss";

interface StateProps {
  source: Source;
  nodeIds: Seq.Indexed<string>;
  wireIds: Seq.Indexed<string>;
}

interface DispatchProps {}

interface OwnProps {
  className?: string;
  path: string[];
  sourceId: string;
}

type Props = StateProps & DispatchProps & OwnProps;

const noop = () => undefined;

class PartialFormulaView extends React.PureComponent<Props> {
  wrapper: HTMLDivElement | null = null;

  render() {
    const { className, path, source } = this.props;
    return (
      <div className={classnames("formulaView", className)}>
        <Toolbar className="formulaView-toolbar">
          <ToolButton link to="/">
            <Icon name="close" />
          </ToolButton>
          {path.map((_, i) => renderPathSegment(path, i))}
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
}

const renderPathSegment = (path: string[], index: number) => (
  <span
    key={`${index}:${path[index]}`}
    className={classnames("formulaView-toolbar-path-segment", {
      "mod-final": index === path.length - 1,
    })}
  >
    {path[index]}
  </span>
);

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
});

const FormulaView = connectStore<StateProps, DispatchProps, OwnProps, AppState>(
  mapStateToProps,
)(PartialFormulaView);

export { FormulaView };
