import React from "react";
import { DragLayer, DragLayerCollector } from "react-dnd";

import { DndTypes, Position2d } from "common/types";

import "./AppDragLayer.scss";

import { NodeDragItem } from "./items/NodeDragItem";

interface OwnProps {}
interface LayerProps {
  itemType: DndTypes;
  initialOffset: Position2d;
  currentOffset: Position2d;
}
type Props = OwnProps & LayerProps;

class PartialDragLayer extends React.PureComponent<Props> {
  public render() {
    return <div className="appDragLayer">{this.renderDragItem()}</div>;
  }

  private renderDragItem() {
    const { itemType, currentOffset } = this.props;
    switch (itemType) {
      case DndTypes.NODE: {
        return <NodeDragItem currentOffset={currentOffset} />;
      }
      default: {
        return null;
      }
    }
  }
}

const collectLayer: DragLayerCollector = monitor => ({
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
});
const AppDragLayer = DragLayer<OwnProps>(collectLayer)(PartialDragLayer);

export { AppDragLayer };
