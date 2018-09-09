import classNames from "classnames";
import { Seq } from "immutable";
import React from "react";

import { CommonAttributes, Position2d } from "common/types";

import { Wire as WireView } from "components/atoms";

import { TerminalReference } from "data/common";
import { Wire } from "data/Wire";

interface Props extends CommonAttributes {
  wires: Seq.Indexed<Wire>;
  getTerminalPosition: (terminal: TerminalReference) => Position2d;
}

class WireLayer extends React.PureComponent<Props> {
  render() {
    const { className, wires, getTerminalPosition } = this.props;
    return (
      <svg className={classNames("wireLayer", className)}>
        {wires
          .map(wire => {
            const { start, end } = wire;
            const startPos = getTerminalPosition(start);
            const endPos = getTerminalPosition(end);
            return (
              <WireView
                startPos={new Position2d(startPos.x, startPos.y)}
                endPos={new Position2d(endPos.x, endPos.y)}
                key={`${start.id}/${start.index}-${end.id}/${end.index}`}
              />
            );
          })
          .toIndexedSeq()}
      </svg>
    );
  }
}

export { WireLayer, Props };
