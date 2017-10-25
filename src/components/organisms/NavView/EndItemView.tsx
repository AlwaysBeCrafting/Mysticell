import classnames from "classnames";
import React from "react";
import {
  ConnectDragPreview,
  ConnectDragSource,
  DragSource,
  DragSourceCollector,
  DragSourceSpec,
} from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { Link } from "react-router-dom";

import { DndTypes } from "common/types";

import { Icon } from "components/atoms";

import { isProperty, NodePrototype } from "data/NodePrototype";

import functionIcon from "./assets/icon-function.svg";
import propertyIcon from "./assets/icon-property.svg";

interface OwnProps {
  prototype: NodePrototype;
  path: string[];
  selected?: boolean;
}

interface DragProps {
  connectDrag: ConnectDragSource;
  connectPreview: ConnectDragPreview;
}

type Props = OwnProps & DragProps;

class PartialEndItemView extends React.PureComponent<Props> {
  public componentDidMount() {
    this.props.connectPreview(getEmptyImage());
  }

  public render() {
    const { connectDrag, path, prototype, selected } = this.props;
    return connectDrag(
      <div>
        <Link
          className={classnames("navView-item", { "is-selected": selected })}
          to={`/${path.slice(1).join("/")}/${prototype.name}`}
        >
          <Icon
            className={classnames("navView-item-icon", {
              "is-selected": selected,
            })}
            src={isProperty(prototype) ? propertyIcon : functionIcon}
          />
          <div className="navView-item-title">{prototype.name}</div>
        </Link>
      </div>,
    );
  }
}

const dragSpec: DragSourceSpec<OwnProps> = {
  beginDrag: props => props.prototype,
};

const dragCollect: DragSourceCollector = (connect, monitor) => ({
  connectDrag: connect.dragSource(),
  connectPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});

const EndItemView = DragSource(DndTypes.NODE_PROTOTYPE, dragSpec, dragCollect)(
  PartialEndItemView,
);

export { EndItemView };
