import classnames from "classnames";
import React from "react";
import {
  ConnectDropTarget,
  DropTarget,
  DropTargetCollector,
  DropTargetSpec,
} from "react-dnd";
import { connect as connectStore } from "react-redux";

import { Dict, DndTypes, Position2d } from "common/types";
import { elementRelativePosition, graphLayoutWidth } from "common/utils";

import { Icon, ToolButton } from "components/atoms";
import { ErrorBoundary, Toolbar } from "components/molecules";

import { AppState } from "data/AppState";
import { NodeInfo } from "data/common";
import { InnerNode } from "data/Graph";
import {
  addNode,
  changePropertyInputValueAsync,
  generateGraphNode,
  GraphNodePrototype,
  NodePrototype,
  placeNode,
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
    prototypeId: string,
    index: number,
    newValue: string,
  ) => void;
  placeNode: (nodeId: string, position: Position2d) => void;
  addNode: (node: InnerNode) => void;
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

class PartialGraphView extends React.PureComponent<Props> {
  public wrapper: HTMLDivElement | null;

  public render() {
    const {
      className,
      connectDrop,
      path,
      prototype,
      nodePrototypes,
      propertyCache,
      changePropertyInputValue,
    } = this.props;
    return (
      // tslint:disable-next-line:no-console
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
                onValueChange={changePropertyInputValue}
              />
            </ErrorBoundary>
            {this.renderGrid(prototype, nodePrototypes)}
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
  }

  private renderGrid(
    prototype: GraphNodePrototype,
    nodePrototypes: Dict<NodePrototype>,
  ) {
    const gridStyle = { flexBasis: 40 * graphLayoutWidth(prototype.layout) };
    return (
      <div
        className="graphView-graph-grid"
        style={gridStyle}
        ref={elem => (this.wrapper = elem)}
      >
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
  }
}

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

const dropSpec: DropTargetSpec<StoreProps> = {
  drop: (props, monitor, component) => {
    const gridPosition = elementRelativePosition(
      (component as PartialGraphView).wrapper!,
      monitor!.getSourceClientOffset(),
    );
    gridPosition.x = Math.round(gridPosition.x / 40);
    gridPosition.y = Math.round(gridPosition.y / 40);
    switch (monitor!.getItemType()) {
      case DndTypes.NODE: {
        const nodeInfo = monitor!.getItem() as NodeInfo;
        props.placeNode(nodeInfo.id, gridPosition);
        break;
      }
      case DndTypes.NODE_PROTOTYPE: {
        const prototype = monitor!.getItem() as NodePrototype;
        const node = generateGraphNode(prototype);
        props.addNode(node);
        props.placeNode(node.id, gridPosition);
        break;
      }
    }
  },
};
const dropCollect: DropTargetCollector = connect => ({
  connectDrop: connect.dropTarget(),
});
const DropGraphView = DropTarget(
  [DndTypes.NODE, DndTypes.NODE_PROTOTYPE],
  dropSpec,
  dropCollect,
)(PartialGraphView);

const GraphView = connectStore<StateProps, DispatchProps, OwnProps>(
  (state: AppState) => ({
    nodePrototypes: state.document.nodePrototypes,
    propertyCache: state.propertyCache,
  }),
  (dispatch, props) => ({
    changePropertyInputValue: (
      prototypeId: string,
      index: number,
      newValue: string,
    ) => {
      dispatch(changePropertyInputValueAsync(prototypeId, index, newValue));
    },
    placeNode: (nodeId: string, newPosition: Position2d) => {
      dispatch(placeNode(props.prototype.id, nodeId, newPosition));
    },
    addNode: (node: InnerNode) => {
      dispatch(addNode(props.prototype.id, node));
    },
  }),
)(DropGraphView);

export { GraphView };
