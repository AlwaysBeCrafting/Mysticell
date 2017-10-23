import React from "react";
import { DragLayer, DragLayerCollector } from "react-dnd";

import { DndTypes, Position2d } from "common/types";

import { NodeInfo } from "data/common";
import { NodePrototype } from "data/NodePrototype";

import "./AppDragLayer.scss";

import { NodeDragItem } from "./items/NodeDragItem";
import { NodePrototypeDragItem } from "./items/NodePrototypeDragItem";

interface OwnProps {}
interface CommonLayerProps {
  initialOffset: Position2d;
  currentOffset: Position2d;
}
interface NodeLayerProps extends CommonLayerProps {
  itemType: DndTypes.NODE;
  item: NodeInfo;
}
interface NodePrototypeLayerProps extends CommonLayerProps {
  itemType: DndTypes.NODE_PROTOTYPE;
  item: NodePrototype;
}
type LayerProps = NodeLayerProps | NodePrototypeLayerProps;
type Props = OwnProps & LayerProps;

class PartialDragLayer extends React.PureComponent<Props> {
  public render() {
    return <div className="appDragLayer">{this.renderDragItem()}</div>;
  }

  private renderDragItem() {
    const { currentOffset } = this.props;
    switch (this.props.itemType) {
      case DndTypes.NODE: {
        const { item } = this.props;
        return <NodeDragItem nodeInfo={item} currentOffset={currentOffset} />;
      }
      case DndTypes.NODE_PROTOTYPE: {
        const { item } = this.props;
        return (
          <NodePrototypeDragItem
            prototype={item}
            currentOffset={currentOffset}
          />
        );
      }
      default: {
        return null;
      }
    }
  }
}

const collectLayer: DragLayerCollector = monitor => ({
  itemType: monitor.getItemType(),
  item: monitor.getItem(),
  initialOffset: monitor.getInitialClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
});
const AppDragLayer = DragLayer<OwnProps>(collectLayer)(PartialDragLayer);

export { AppDragLayer };
