import React from "react";

import { CardView } from "components/molecules";

import { Position2d } from "common/types";

import { CardSnapshot } from "data/Card";

import "./CardTemplateDragItem.scss";
import { DragItem } from "./DragItem";

interface Props {
  snapshot: CardSnapshot;
  currentOffset: Position2d;
}

class CardTemplateDragItem extends DragItem<Props> {
  render() {
    const { x, y } = this.props.currentOffset;
    const style = {
      transform: `translate(${x}px, ${y}px)`,
    };
    return (
      <CardView
        className="cardTemplateDragItem"
        snapshot={this.props.snapshot}
        style={style}
      />
    );
  }
}

export { CardTemplateDragItem };
