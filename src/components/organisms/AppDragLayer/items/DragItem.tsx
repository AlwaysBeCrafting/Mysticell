import React from "react";

import { Position2d } from "common/types";

interface Props {
  currentOffset: Position2d;
}

class DragItem<P, S = {}> extends React.Component<Props & P, S> {
  public shouldComponentUpdate(nextProps: Props) {
    const { currentOffset: nextOffset } = nextProps;
    const { currentOffset } = this.props;
    return (
      nextOffset &&
      (nextOffset.x !== currentOffset.x || nextOffset.y !== currentOffset.y)
    );
  }
}

export { DragItem };
