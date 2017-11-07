import React from "react";

import { CardView } from "components/molecules";

import { CardSnapshot } from "data/Card";

import "./CardDragItem.scss";
import { DragItem } from "./DragItem";

interface Props {
  snapshot: CardSnapshot;
}

class CardDragItem extends DragItem<Props> {
  render() {
    const { x, y } = this.props.currentOffset;
    const style = {
      transform: `translate(${x}px, ${y}px)`,
    };
    return (
      <CardView
        className="cardDragItem"
        snapshot={this.props.snapshot}
        style={style}
      />
    );
  }
}

export { CardDragItem };
