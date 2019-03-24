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

// TODO This got stubbed because the typings were a gigantic pain during upgrade
// TODO See if keeping react-dnd is worth this `string | symbol | null` nonsense
const PartialDragLayer = (_: Props) => <div className="AppDragLayer" />;

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
