import classnames from "classnames";
import React from "react";
import {
  ConnectDropTarget,
  DropTarget,
  DropTargetCollector,
  DropTargetSpec,
} from "react-dnd";
import { connect as connectStore } from "react-redux";

import { Dict, DndTypes } from "common/types";
import { graphLayoutWidth } from "common/utils";

import { Icon, ToolButton } from "components/atoms";
import { ErrorBoundary, Toolbar } from "components/molecules";

import { AppState } from "data/AppState";
import { NodeInfo } from "data/common";
import {
  changePropertyInputValueAsync,
  GraphNodePrototype,
  moveNodeRelative,
  NodePrototype,
} from "data/NodePrototype";
import { PropertyCache } from "data/PropertyCache";

import { Boundary } from "./Boundary";
import { NodeLayer } from "./NodeLayer";
import { WireLayer } from "./WireLayer";

import "./GraphView.scss";

interface StateProps {
  nodePrototypes: Dict<NodePrototype>;
  propertyCache: PropertyCache;
}
interface DispatchProps {
  changePropertyInputValue: (
    propertyId: string,
    index: number,
    newValue: string,
  ) => void;
  moveNodeRelative: (
    propertyId: string,
    nodeId: string,
    dX: number,
    dY: number,
  ) => void;
}
interface OwnProps {
  className?: string;
  path: string[];
  prototype: GraphNodePrototype;
}
type StoreProps = StateProps & DispatchProps & OwnProps;
interface DropProps {
  connectDrop: ConnectDropTarget;
}
type Props = StoreProps & DropProps;

const PartialGraphView = (props: Props) => {
  const {
    className,
    connectDrop,
    path,
    prototype,
    nodePrototypes,
    propertyCache,
  } = props;
  return (
    <div className={classnames("graphView", className)}>
      <Toolbar className="graphView-toolbar">
        <ToolButton link to="/">
          <Icon name="close" />
        </ToolButton>
        {path.map((_, i) => renderPathSegment(path, i))}
      </Toolbar>
      {connectDrop(
        <div className="graphView-graph">
          <ErrorBoundary>
            <Boundary
              input
              prototype={prototype}
              propertyCache={propertyCache}
              onValueChange={props.changePropertyInputValue}
            />
          </ErrorBoundary>
          {renderGrid(prototype, nodePrototypes)}
          <ErrorBoundary>
            <Boundary
              output
              prototype={prototype}
              propertyCache={propertyCache}
            />
          </ErrorBoundary>
        </div>,
      )}
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

const dropSpec: DropTargetSpec<StoreProps> = {
  drop: (props, monitor) => {
    const item = monitor!.getItem() as NodeInfo;
    const dX = Math.round(monitor!.getDifferenceFromInitialOffset().x / 40);
    const dY = Math.round(monitor!.getDifferenceFromInitialOffset().y / 40);
    props.moveNodeRelative(item.parentId, item.id, dX, dY);
  },
};
const dropCollect: DropTargetCollector = connect => ({
  connectDrop: connect.dropTarget(),
});
const DropGraphView = DropTarget(DndTypes.NODE, dropSpec, dropCollect)(
  PartialGraphView,
);

const GraphView = connectStore<StateProps, DispatchProps, OwnProps>(
  (state: AppState) => ({
    nodePrototypes: state.document.nodePrototypes,
    propertyCache: state.propertyCache,
  }),
  dispatch => ({
    changePropertyInputValue: (
      propertyId: string,
      index: number,
      newValue: string,
    ) => {
      dispatch(changePropertyInputValueAsync(propertyId, index, newValue));
    },
    moveNodeRelative: (
      prototypeId: string,
      nodeId: string,
      dX: number,
      dY: number,
    ) => {
      dispatch(moveNodeRelative(prototypeId, nodeId, dX, dY));
    },
  }),
)(DropGraphView);

export { GraphView };
