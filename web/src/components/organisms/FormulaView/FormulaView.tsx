import classnames from "classnames";
import { Seq } from "immutable";
import React from "react";
import { Icon } from "react-atoms";
import { RouteComponentProps, Route } from "react-router";

import { CommonAttributes } from "common/types";

import { ToolButton } from "components/atoms";
import { ErrorBoundary, Toolbar } from "components/molecules";

import { Source } from "data/Source";

import { Boundary } from "./Boundary";
import { ConnectedNodeLayer } from "./ConnectedNodeLayer";
import { ConnectedWireLayer } from "./ConnectedWireLayer";

import "./FormulaView.scss";

type RouteProps = RouteComponentProps<{ documentId: string; path: string }>;

interface Props extends CommonAttributes {
  source: Source;
  nodeIds: Iterable<string>;
  wireIds: Iterable<string>;
  path: Seq.Indexed<string>;
}

const noop = () => undefined;

class FormulaView extends React.PureComponent<Props> {
  wrapper: HTMLDivElement | null = null;

  render() {
    const { className, source, path } = this.props;
    return (
      <div className={classnames("FormulaView", className)}>
        <Toolbar className="FormulaView-toolbar">
          <Route path="/:documentId" render={this.renderCloseButton} />
          {path.map(this.renderPathSegment(path))}
        </Toolbar>
        <div className="FormulaView-graph">
          <ErrorBoundary>
            <Boundary
              className="FormulaView-graph-boundary mod-input"
              input
              source={source}
              onValueChange={noop}
            />
          </ErrorBoundary>
          <ErrorBoundary>
            <Boundary
              className="FormulaView-graph-boundary mod-output"
              output
              source={source}
            />
          </ErrorBoundary>
          <div
            className="FormulaView-graph-grid"
            ref={elem => (this.wrapper = elem)}
          >
            <ConnectedWireLayer
              className="FormulaView-graph-grid-wires"
              sourceId={source.id}
            />
            <ConnectedNodeLayer
              className="FormulaView-graph-grid-nodes"
              sourceId={source.id}
            />
          </div>
        </div>
      </div>
    );
  }

  private renderCloseButton = (routeProps: RouteProps) => (
    <ToolButton to={`/${routeProps.match.params.documentId}`}>
      <Icon name="close" />
    </ToolButton>
  );

  private renderPathSegment = (path: Iterable<string>) => (
    segment: string,
    i: number,
  ) => (
    <span
      key={i}
      className={classnames("FormulaView-toolbar-path-segment", {
        "mod-final": i === Seq.Indexed(path).count() - 1,
      })}
    >
      {segment}
    </span>
  );
}

export { FormulaView, Props };
