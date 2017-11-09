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

import { CardSnapshot } from "data/Card";
import { CardTemplate, isProperty } from "data/CardTemplate";
import { TemplatePath } from "data/Palette";

import functionIcon from "./assets/icon-function.svg";
import propertyIcon from "./assets/icon-property.svg";

interface OwnProps {
  template: CardTemplate;
  path: TemplatePath;
  selected?: boolean;
}

interface DragProps {
  connectDrag: ConnectDragSource;
  connectPreview: ConnectDragPreview;
}

type Props = OwnProps & DragProps;

class PartialEndItemView extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.connectPreview(getEmptyImage());
  }

  render() {
    const { connectDrag, path, template, selected } = this.props;
    return connectDrag(
      <div>
        <Link
          className={classnames("paletteView-item", {
            "is-selected": selected,
          })}
          to={`/${path.butLast().join("/")}/${template.name}`}
        >
          <Icon
            className={classnames("paletteView-item-icon", {
              "is-selected": selected,
            })}
            src={isProperty(template) ? propertyIcon : functionIcon}
          />
          <div className="paletteView-item-title">{template.name}</div>
        </Link>
      </div>,
    );
  }
}

const dragSpec: DragSourceSpec<OwnProps> = {
  beginDrag: props => CardSnapshot.fromTemplate(props.template),
};

const dragCollect: DragSourceCollector = (connect, monitor) => ({
  connectDrag: connect.dragSource(),
  connectPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});

const EndItemView = DragSource(DndTypes.CARD_TEMPLATE, dragSpec, dragCollect)(
  PartialEndItemView,
);

export { EndItemView };
