import classnames from "classnames";
import React from "react";
import { connect } from "react-redux";

import { Dict } from "common/types";
import { graphLayoutWidth } from "common/utils";

import { Icon, ToolButton } from "components/atoms";
import { Toolbar } from "components/molecules";

import { AppState } from "data/AppState";
import { GraphNodePrototype, NodePrototype } from "data/NodePrototype";

import { Boundary } from "./Boundary";
import { NodeLayer } from "./NodeLayer";
import { WireLayer } from "./WireLayer";

import "./GraphView.scss";

interface StateProps {
  nodePrototypes: Dict<NodePrototype>;
}
interface OwnProps {
  className?: string;
  path: string[];
  prototype: GraphNodePrototype;
}
type Props = StateProps & OwnProps;

const PartialGraphView = (props: Props) => {
  const { className, path, prototype, nodePrototypes } = props;
  return (
    <div className={classnames("graphView", className)}>
      <Toolbar className="graphView-toolbar">
        <ToolButton link to="/">
          <Icon name="close" />
        </ToolButton>
        {path.map((_, i) => renderPathSegment(path, i))}
      </Toolbar>
      <div className="graphView-graph">
        <Boundary input prototype={prototype} />
        {renderGrid(prototype, nodePrototypes)}
        <Boundary output prototype={prototype} />
      </div>
    </div>
  );
};

const renderPathSegment = (path: string[], index: number) => (
  <span
    key={`${index}:${path[index]}`}
    className={classnames("graphView-toolbar-path-segment", {
      "mod-final": index === path.length - 1,
    })}
  >
    {path[index]}
  </span>
);

const renderGrid = (
  prototype: GraphNodePrototype,
  nodePrototypes: Dict<NodePrototype>,
) => {
  const gridStyle = { flexBasis: 40 * graphLayoutWidth(prototype.layout) };
  return (
    <div className="graphView-graph-grid" style={gridStyle}>
      <WireLayer
        className="graphView-graph-grid-wires"
        prototype={prototype}
        nodePrototypes={nodePrototypes}
      />
      <NodeLayer
        className="graphView-graph-grid-nodes"
        prototype={prototype}
        nodePrototypes={nodePrototypes}
      />
    </div>
  );
};

const GraphView = connect<StateProps, {}, OwnProps>((state: AppState) => ({
  nodePrototypes: state.document.nodePrototypes,
}))(PartialGraphView);

export { GraphView };
