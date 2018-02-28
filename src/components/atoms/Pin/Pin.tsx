import classNames from "classnames";
import React from "react";
import {
  ConnectDragPreview,
  ConnectDragSource,
  ConnectDropTarget,
  DragSource,
  DragSourceCollector,
  DragSourceSpec,
  DropTarget,
  DropTargetCollector,
  DropTargetSpec,
} from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import { NodeValue } from "data/CardTemplate";

import { DndTypes } from "common/types";

import "./Pin.scss";

interface DragItem {
  id: string;
  node: NodeValue;
}

interface OwnProps {
  className?: string;
  id?: string;
  node?: NodeValue;
  onConnect?: (from: string, to: string) => void;
}

interface DragProps {
  connectDragPreview: ConnectDragPreview;
  connectDragSource: ConnectDragSource;
}
interface DropProps {
  connectDropTarget: ConnectDropTarget;
}

type DndProps = DragProps & DropProps;

type Props = OwnProps & DndProps;

class PartialPin extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage());
  }

  render() {
    const {
      className,
      connectDragSource,
      connectDropTarget,
      node,
    } = this.props;
    const classMod = node && `mod-${node.wireAnchor}`;
    return connectDragSource(
      connectDropTarget(
        <div className={classNames(className, "pin", classMod)} />,
      ),
    );
  }
}

const dragSpec: DragSourceSpec<OwnProps> = {
  beginDrag: props => ({ id: props.id, node: props.node }),
};
const dragCollect: DragSourceCollector = connect => ({
  connectDragPreview: connect.dragPreview(),
  connectDragSource: connect.dragSource(),
});
const DragPin = DragSource<Props>(
  props =>
    props.node && props.node.wireAnchor === "start"
      ? DndTypes.WIRE_END
      : DndTypes.WIRE_START,
  dragSpec,
  dragCollect,
)(PartialPin);

const dropSpec: DropTargetSpec<OwnProps> = {
  drop: (props, monitor) => {
    if (props.onConnect) {
      const { id } = monitor!.getItem() as DragItem;
      switch (monitor!.getItemType() as DndTypes) {
        case DndTypes.WIRE_START: {
          props.onConnect(props.id!, id);
          break;
        }
        case DndTypes.WIRE_END: {
          props.onConnect(id, props.id!);
          break;
        }
      }
    }
  },
  canDrop: (props, monitor) => {
    const { node } = monitor!.getItem() as DragItem;
    if (!props.node) {
      return false;
    }
    return (
      (props.node.type === node.type
        ? props.node.wireAnchor !== node.wireAnchor
        : props.node.wireAnchor === node.wireAnchor) &&
      (props.node.type === "card" && node.type === "card"
        ? props.node.card !== node.card
        : true)
    );
  },
};
const dropCollect: DropTargetCollector = connect => ({
  connectDropTarget: connect.dropTarget(),
});
const Pin = DropTarget(
  props =>
    props.node && props.node.wireAnchor === "start"
      ? DndTypes.WIRE_END
      : DndTypes.WIRE_START,
  dropSpec,
  dropCollect,
)(DragPin);

export { Pin };
