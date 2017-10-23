import React from "react";

import { Position2d } from "common/types";

import { NodeView } from "components/molecules";

import { NodeInfo } from "data/common";
import { NodePrototype } from "data/NodePrototype";

import { DragItem } from "./DragItem";
import "./NodePrototypeDragItem.scss";

interface Props {
  prototype: NodePrototype;
  currentOffset: Position2d;
}
interface State {
  nodeInfo: NodeInfo;
}

class NodePrototypeDragItem extends DragItem<Props, State> {
  public componentWillMount() {
    this.setState({ nodeInfo: generateNodeInfo(this.props.prototype) });
  }
  public componentWillReceiveProps(nextProps: Props) {
    this.setState({ nodeInfo: generateNodeInfo(nextProps.prototype) });
  }

  public render() {
    const { x, y } = this.props.currentOffset;
    const style = {
      transform: `translate(${x}px, ${y}px)`,
    };
    return (
      <NodeView
        className="nodePrototypeDragItem"
        nodeInfo={this.state.nodeInfo}
        position={{ x: 0, y: 0 }}
        style={style}
      />
    );
  }
}

const generateNodeInfo = (prototype: NodePrototype): NodeInfo => ({
  id: "node.drag",
  label: prototype.name,
  parentId: prototype.id,
  inputs: prototype.inputNames.map(inputName => ({
    name: inputName,
    value: "",
    isConnected: false,
  })),
  outputs: prototype.outputNames.map(outputName => ({ name: outputName })),
});

export { NodePrototypeDragItem };
