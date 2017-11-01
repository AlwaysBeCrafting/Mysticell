import React from "react";
import { DragLayer, DragLayerCollector } from "react-dnd";

import { DndTypes, Position2d } from "common/types";

import { NodeInfo } from "data/common";

import "./AppDragLayer.scss";

import { NodeDragItem } from "./items/NodeDragItem";
import { NodePrototypeDragItem } from "./items/NodePrototypeDragItem";
import { WireDragItem } from "./items/WireDragItem";

interface OwnProps {}
interface CommonLayerProps {
  initialClientOffset: Position2d;
  clientOffset: Position2d;
  sourceClientOffset: Position2d;
}
interface NodeLayerProps extends CommonLayerProps {
  itemType: DndTypes.NODE;
  item: NodeInfo;
}
interface NodePrototypeLayerProps extends CommonLayerProps {
  itemType: DndTypes.NODE_PROTOTYPE;
  item: NodeInfo;
}
interface WireLayerProps extends CommonLayerProps {
  itemType: DndTypes.WIRE_START | DndTypes.WIRE_END;
  item: { nodeId: string };
}
type LayerProps = NodeLayerProps | NodePrototypeLayerProps | WireLayerProps;
type Props = OwnProps & LayerProps;

class PartialDragLayer extends React.PureComponent<Props> {
  public render() {
    return <div className="appDragLayer">{this.renderDragItem()}</div>;
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
          <NodeDragItem nodeInfo={item} currentOffset={sourceClientOffset} />
        );
      }
      case DndTypes.NODE_PROTOTYPE: {
        const { item } = this.props;
        return (
          <NodePrototypeDragItem
            nodeInfo={item}
            currentOffset={sourceClientOffset}
          />
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
