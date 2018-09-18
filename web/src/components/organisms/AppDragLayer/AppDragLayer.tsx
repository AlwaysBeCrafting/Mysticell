import React from "react";
import { DragLayer, DragLayerCollector } from "react-dnd";

import { DndTypes, Position2d } from "common/types";

import "./AppDragLayer.scss";

import { NodeDragItem } from "./items/NodeDragItem";
import { WireDragItem } from "./items/WireDragItem";

interface OwnProps {}

interface CommonLayerProps {
  initialClientOffset: Position2d;
  clientOffset: Position2d;
  sourceClientOffset: Position2d;
}

interface NodeLayerProps extends CommonLayerProps {
  itemType: DndTypes.NODE;
  item: string;
}

interface WireLayerProps extends CommonLayerProps {
  itemType: DndTypes.WIRE_START | DndTypes.WIRE_END;
  item: { nodeId: string };
}

type LayerProps = NodeLayerProps | WireLayerProps;

type Props = OwnProps & LayerProps;

class PartialDragLayer extends React.PureComponent<Props> {
  render() {
    return <div className="AppDragLayer">{this.renderDragItem()}</div>;
  }

  private renderDragItem() {
    const {
      initialClientOffset,
      sourceClientOffset,
      clientOffset,
    } = this.props;
    switch (this.props.itemType) {
      case DndTypes.NODE: {
        const { item } = this.props;
        return (
          <NodeDragItem nodeId={item} currentOffset={sourceClientOffset} />
        );
      }
      case DndTypes.WIRE_START: {
        return (
          <WireDragItem
            end={initialClientOffset}
            currentOffset={clientOffset}
          />
        );
      }
      case DndTypes.WIRE_END: {
        return (
          <WireDragItem
            start={initialClientOffset}
            currentOffset={clientOffset}
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
  initialClientOffset: monitor.getInitialClientOffset(),
  clientOffset: monitor.getClientOffset(),
  sourceClientOffset: monitor.getSourceClientOffset(),
});
const AppDragLayer = DragLayer<OwnProps>(collectLayer)(PartialDragLayer);

export { AppDragLayer };
