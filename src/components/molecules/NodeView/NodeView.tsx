import classNames from "classnames";
import React from "react";
import {
  ConnectDragPreview,
  ConnectDragSource,
  DragSource,
  DragSourceCollector,
  DragSourceSpec,
} from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import { DndTypes, Position2d } from "common/types";

import { Pin } from "components/atoms";

import { NodeInfo } from "data/common";

import "./NodeView.scss";

interface OwnProps {
  className?: string;
  style?: React.CSSProperties;
  position: Position2d;
  nodeInfo: NodeInfo;
  onUserValueChange?: (
    prototypeId: string,
    nodeId: string,
    index: number,
    newValue: string,
  ) => void;
}
interface DragProps {
  connectDrag: ConnectDragSource;
  connectPreview: ConnectDragPreview;
  isDragging: boolean;
}
type Props = OwnProps & DragProps;
class PartialNodeView extends React.PureComponent<Props> {
  public componentDidMount() {
    this.props.connectPreview(getEmptyImage());
  }

  public render() {
    const {
      className,
      style,
      position,
      nodeInfo,
      connectDrag,
      isDragging,
    } = this.props;
    const { label, inputs, outputs } = nodeInfo;
    const pinCount = inputs.length + outputs.length;
    const positionedStyle = {
      gridRow: `${position.y + 1} / span ${pinCount + 1}`,
      gridColumn: `${position.x + 1} / span 4`,
      ...style,
      opacity: isDragging ? 0.6 : 1,
    };
    return connectDrag(
      <div
        className={classNames("nodeView", className)}
        style={positionedStyle}
      >
        <header className="nodeView-headerRow nodeView-row">
          <span className="nodeView-headerRow-name">{label}</span>
        </header>
        {outputs.map((output, index) => (
          <Pin
            source
            key={output.name}
            name={output.name}
            takesInput={false}
            index={index}
          />
        ))}
        {inputs.map((input, index) => (
          <Pin
            target
            key={input.name}
            name={input.name}
            takesInput={!input.isConnected}
            userValue={input.value}
            index={index}
            onChange={this.onUserValueChange}
          />
        ))}
      </div>,
    );
  }

  private onUserValueChange = (index: number, value: string) => {
    const { onUserValueChange } = this.props;
    if (onUserValueChange) {
      const { id, parentId } = this.props.nodeInfo;
      onUserValueChange(parentId, id, index, value);
    }
  };
}

const dragSpec: DragSourceSpec<OwnProps> = {
  beginDrag: props => props.nodeInfo,
};
const dragCollect: DragSourceCollector = (connect, monitor) => ({
  connectDrag: connect.dragSource(),
  connectPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});
const NodeView = DragSource(DndTypes.NODE, dragSpec, dragCollect)(
  PartialNodeView,
);

export { NodeView };
