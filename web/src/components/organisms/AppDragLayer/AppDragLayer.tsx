import React from "react";
import { DragLayer, DragLayerCollector, XYCoord } from "react-dnd";

import "./AppDragLayer.scss";

interface OwnProps {}

interface CommonLayerProps {
  initialClientOffset: XYCoord | null;
  clientOffset: XYCoord | null;
  sourceClientOffset: XYCoord | null;
}

interface NodeLayerProps extends CommonLayerProps {
  itemType: string | symbol | null;
  item: string;
}

interface WireLayerProps extends CommonLayerProps {
  itemType: string | symbol | null;
  item: { nodeId: string };
}

type LayerProps = NodeLayerProps | WireLayerProps;

type Props = OwnProps & LayerProps;

class PartialDragLayer extends React.PureComponent<Props> {
  render() {
    return <div className="AppDragLayer">{this.renderDragItem()}</div>;
  }

  private renderDragItem() {
    return null;
  }
}

const collectLayer: DragLayerCollector<
  {},
  CommonLayerProps & LayerProps
> = monitor => ({
  itemType: monitor.getItemType(),
  item: monitor.getItem(),
  initialClientOffset: monitor.getInitialClientOffset(),
  clientOffset: monitor.getClientOffset(),
  sourceClientOffset: monitor.getSourceClientOffset(),
});
const AppDragLayer = DragLayer<OwnProps>(collectLayer)(PartialDragLayer);

export { AppDragLayer };
