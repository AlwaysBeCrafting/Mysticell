import React from "react";
import {
  ConnectDragSource,
  DragSource,
  DragSourceCollector,
  DragSourceSpec,
} from "react-dnd";

import { DndTypes } from "common/types";

import { Pin } from "components/atoms";

import { InnerNode } from "data/Graph";
import { NodePrototype } from "data/NodePrototype";

import "./NodeView.scss";

interface OwnProps {
  node: InnerNode;
  prototype: NodePrototype;
  position: [number, number];
  isInputConnected: (nodeId: string, index: number) => boolean;
  onUserValueChange: (nodeId: string, index: number, value: string) => void;
}
interface DragProps {
  connectDrag: ConnectDragSource;
}
type Props = OwnProps & DragProps;
class PartialNodeView extends React.PureComponent<Props> {
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
    return connectDrag(
      <div className="nodeView" style={makeStyle(position, pinRowCount)}>
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
const makeStyle = (position: [number, number], pinRowCount: number) => ({
  gridRow: `${position[1] + 1} / span ${pinRowCount + 1}`,
  gridColumn: `${position[0] + 1} / span 4`,
});

const dragSpec: DragSourceSpec<OwnProps> = {
  beginDrag: props => ({ nodeId: props.node.id }),
};
const dragCollect: DragSourceCollector = connect => ({
  connectDrag: connect.dragSource(),
});
const NodeView = DragSource(DndTypes.NODE, dragSpec, dragCollect)(
  PartialNodeView,
);

export { NodeView };
