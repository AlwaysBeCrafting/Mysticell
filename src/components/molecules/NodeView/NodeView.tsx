import React from "react";
import {
  ConnectDragPreview,
  ConnectDragSource,
  DragSource,
  DragSourceCollector,
  DragSourceSpec,
} from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import { DndTypes } from "common/types";

import { Pin } from "components/atoms";

import { InnerNode } from "data/Graph";
import { NodePrototype } from "data/NodePrototype";

import "./NodeView.scss";

interface OwnProps {
  node: InnerNode;
  prototype: NodePrototype;
  style?: React.CSSProperties;
  position: [number, number];
  isInputConnected: (nodeId: string, index: number) => boolean;
  onUserValueChange: (nodeId: string, index: number, value: string) => void;
}
interface DragProps {
  connectDrag: ConnectDragSource;
  connectPreview: ConnectDragPreview;
}
type Props = OwnProps & DragProps;
class PartialNodeView extends React.PureComponent<Props> {
  public componentDidMount() {
    this.props.connectPreview(getEmptyImage());
  }

  public render() {
    const {
      connectDrag,
      isInputConnected,
      node,
      position,
      prototype,
    } = this.props;
    const name = node.label || prototype.name;
    const pinRowCount =
      prototype.inputNames.length + prototype.outputNames.length;
    const style = this.props.style || {
      gridRow: `${position[1] + 1} / span ${pinRowCount + 1}`,
      gridColumn: `${position[0] + 1} / span 4`,
    };
    return connectDrag(
      <div className="nodeView" style={style}>
        <header className="nodeView-headerRow nodeView-row">
          <span className="nodeView-headerRow-name">{name}</span>
        </header>
        {prototype.outputNames.map((outputName, index) => (
          <Pin
            source
            key={outputName}
            name={outputName}
            takesInput={false}
            index={index}
          />
        ))}
        {prototype.inputNames.map((inputName, index) => (
          <Pin
            target
            key={inputName}
            name={inputName}
            takesInput={!isInputConnected(node.id, index)}
            userValue={node.constants[index]}
            index={index}
            onChange={this.onUserValueChange}
          />
        ))}
      </div>,
    );
  }

  private onUserValueChange = (index: number, value: string) => {
    this.props.onUserValueChange(this.props.node.id, index, value);
  };
}

const dragSpec: DragSourceSpec<OwnProps> = {
  beginDrag: props => ({ nodeId: props.node.id }),
};
const dragCollect: DragSourceCollector = connect => ({
  connectDrag: connect.dragSource(),
  connectPreview: connect.dragPreview(),
});
const NodeView = DragSource(DndTypes.NODE, dragSpec, dragCollect)(
  PartialNodeView,
);

export { NodeView };
