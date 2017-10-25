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

import { Param } from "data/common";

import { DndTypes } from "common/types";

import "./Pin.scss";

interface DragItem {
  nodeId: string;
  index: number;
}

interface CommonProps {
  className?: string;
  nodeId: string;
  index: number;
  name: string;
  takesInput?: boolean;
  userValue?: string;
  onChange?: (index: number, value: string) => void;
  onConnect?: (
    fromId: string,
    fromIndex: number,
    toId: string,
    toIndex: number,
  ) => void;
  hasPin?: boolean;
  param?: Param;
}
interface SrcProps extends CommonProps {
  source: true;
  target?: undefined;
}
interface TgtProps extends CommonProps {
  source?: undefined;
  target: true;
}
type OwnProps = SrcProps | TgtProps;

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
  public componentDidMount() {
    this.props.connectDragPreview(getEmptyImage());
  }

  public render() {
    const {
      className,
      connectDragSource,
      connectDropTarget,
      name,
      source,
      target,
      hasPin,
    } = this.props;
    const classMod = {
      "mod-source": source,
      "mod-target": target,
    };
    return (
      <div className={classNames("pin", className, classMod)} key={name}>
        {(typeof hasPin === "undefined" || hasPin) &&
          connectDragSource(
            connectDropTarget(
              <div className={classNames("pin-dot", classMod)} />,
            ),
          )}
        <label className={classNames("pin-label", classMod)}>{name}</label>
        {this.renderInputValue(classNames("pin-value", classMod))}
        {this.renderReadOnlyValue(classNames("pin-value", classMod))}
      </div>
    );
  }

  private renderInputValue(className: string) {
    if (this.props.takesInput) {
      return (
        <input
          className={className}
          defaultValue={this.props.userValue}
          onChange={this.onChange}
        />
      );
    }
    return null;
  }

  private renderReadOnlyValue(className: string) {
    if (!this.props.takesInput && this.props.param) {
      return (
        <div className={classNames(className, "mod-readonly")}>
          {this.props.param.value}
        </div>
      );
    }
    return null;
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(this.props.index, event.currentTarget.value);
    }
  };
}

const dragSpec: DragSourceSpec<OwnProps> = {
  beginDrag: props => ({
    nodeId: props.nodeId,
    index: props.index,
  }),
};
const dragCollect: DragSourceCollector = connect => ({
  connectDragPreview: connect.dragPreview(),
  connectDragSource: connect.dragSource(),
});
const DragPin = DragSource(
  props => (props.source ? DndTypes.WIRE_END : DndTypes.WIRE_START),
  dragSpec,
  dragCollect,
)(PartialPin);

const dropSpec: DropTargetSpec<OwnProps> = {
  drop: (props, monitor) => {
    if (props.onConnect) {
      const { nodeId, index } = monitor!.getItem() as DragItem;
      switch (monitor!.getItemType() as DndTypes) {
        case DndTypes.WIRE_START: {
          props.onConnect(props.nodeId, props.index, nodeId, index);
          break;
        }
        case DndTypes.WIRE_END: {
          props.onConnect(nodeId, index, props.nodeId, props.index);
          break;
        }
      }
    }
  },
  canDrop: (props, monitor) =>
    props.nodeId !== (monitor!.getItem() as DragItem).nodeId,
};
const dropCollect: DropTargetCollector = connect => ({
  connectDropTarget: connect.dropTarget(),
});
const Pin = DropTarget(
  props => (props.source ? DndTypes.WIRE_START : DndTypes.WIRE_END),
  dropSpec,
  dropCollect,
)(DragPin);

export { Pin };
