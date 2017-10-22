import React from "react";
import { DragLayer, DragLayerCollector } from "react-dnd";

import { DndTypes, Position2d } from "common/types";

import { NodeInfo } from "data/common";

import "./AppDragLayer.scss";

import { NodeDragItem } from "./items/NodeDragItem";

interface OwnProps {}
interface CommonLayerProps {
  initialOffset: Position2d;
  currentOffset: Position2d;
}
interface NodeLayerProps extends CommonLayerProps {
  itemType: DndTypes.NODE;
  item: NodeInfo;
}
type LayerProps = NodeLayerProps;
type Props = OwnProps & LayerProps;

class PartialDragLayer extends React.PureComponent<Props> {
  public render() {
    return <div className="appDragLayer">{this.renderDragItem()}</div>;
  }

  private renderDragItem() {
    const { itemType, item, currentOffset } = this.props;
    switch (itemType) {
      case DndTypes.NODE: {
        return <NodeDragItem nodeInfo={item} currentOffset={currentOffset} />;
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
