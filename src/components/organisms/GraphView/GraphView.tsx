import classnames from "classnames";
import React from "react";
import {
  ConnectDropTarget,
  DropTarget,
  DropTargetCollector,
  DropTargetSpec,
} from "react-dnd";
import { connect as connectStore } from "react-redux";

import { DndTypes, Position2d } from "common/types";
import { elementRelativePosition } from "common/utils";

import { Icon, ToolButton } from "components/atoms";
import { ErrorBoundary, Toolbar } from "components/molecules";

import { AppState } from "data/AppState";
import { Card, CardSnapshot } from "data/Card";
import {
  addCard,
  GraphCardTemplate,
  gridWidth,
  placeCard,
  setInputValueAsync,
} from "data/CardTemplate";
import { Palette } from "data/Palette";

import { Boundary } from "./Boundary";
import { NodeLayer } from "./NodeLayer";
import { WireLayer } from "./WireLayer";

import "./GraphView.scss";

interface StateProps {
  palette: Palette;
}
interface DispatchProps {
  setInputValue: (prototypeId: string, node: string, newValue: string) => void;
  placeCard: (card: string, position: Position2d) => void;
  addCard: (card: Card) => void;
}
interface OwnProps {
  className?: string;
  path: string[];
  template: GraphCardTemplate;
}
type StoreProps = StateProps & DispatchProps & OwnProps;
interface DropProps {
  connectDrop: ConnectDropTarget;
}
type Props = StoreProps & DropProps;

class PartialGraphView extends React.PureComponent<Props> {
  wrapper: HTMLDivElement | null;

  render() {
    const {
      className,
      connectDrop,
      path,
      template,
      palette,
      setInputValue,
    } = this.props;
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
                template={template}
                onValueChange={setInputValue}
              />
            </ErrorBoundary>
            {this.renderGrid(template, palette)}
            <ErrorBoundary>
              <Boundary output template={template} />
            </ErrorBoundary>
          </div>,
        )}
      </div>
    );
  }

  private renderGrid(template: GraphCardTemplate, palette: Palette) {
    const gridStyle = { flexBasis: 40 * gridWidth(template) };
    return (
      <div
        className="graphView-graph-grid"
        style={gridStyle}
        ref={elem => (this.wrapper = elem)}
      >
        <WireLayer
          className="graphView-graph-grid-wires"
          template={template}
          palette={palette}
        />
        <NodeLayer
          className="graphView-graph-grid-nodes"
          template={template}
          palette={palette}
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
    const offset = monitor!.getSourceClientOffset();
    const gridPosition = elementRelativePosition(
      (component as PartialGraphView).wrapper!,
      new Position2d(Math.round(offset.x / 40), Math.round(offset.y / 40)),
    );
    const snapshot = monitor!.getItem() as CardSnapshot;
    switch (monitor!.getItemType()) {
      case DndTypes.CARD: {
        props.placeCard(snapshot.id, gridPosition);
        break;
      }
      case DndTypes.CARD_TEMPLATE: {
        const card = Card.fromTemplate(
          props.palette.getTemplate(snapshot.template)!,
        );
        props.addCard(card);
        props.placeCard(card.id, gridPosition);
        break;
      }
    }
  },
};
const dropCollect: DropTargetCollector = connect => ({
  connectDrop: connect.dropTarget(),
});
const DropGraphView = DropTarget(
  [DndTypes.CARD, DndTypes.CARD_TEMPLATE],
  dropSpec,
  dropCollect,
)(PartialGraphView);

const GraphView = connectStore<StateProps, DispatchProps, OwnProps>(
  (state: AppState) => ({
    palette: state.document.palette,
  }),
  (dispatch, props) => ({
    setInputValue: (property: string, node: string, newValue: string) => {
      dispatch(setInputValueAsync(property, node, newValue));
    },
    placeCard: (card: string, newPosition: Position2d) => {
      dispatch(placeCard(props.template.id, card, newPosition));
    },
    addCard: (card: Card) => {
      dispatch(addCard(props.template.id, card));
    },
  }),
)(DropGraphView);

export { GraphView };
