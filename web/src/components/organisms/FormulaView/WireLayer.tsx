import classNames from "classnames";
import { Seq } from "immutable";
import React from "react";

import { CommonAttributes, Position2d } from "common/types";

import { Wire as WireView } from "components/atoms";

import { TerminalPointer } from "data/common";
import { Wire } from "data/Wire";

interface Props extends CommonAttributes {
  wires: Seq.Indexed<Wire>;
  getTerminalPosition: (terminal: TerminalPointer) => Position2d;
}

const WireLayer = (props: Props) => {
  const { className, wires, getTerminalPosition } = props;
  return (
    <svg className={classNames("WireLayer", className)}>
      {wires
        .map(wire => {
          const { id, tail, head } = wire;
          return (
            <WireView
              startPos={getTerminalPosition(tail)}
              endPos={getTerminalPosition(head)}
              key={id}
            />
          );
        })
        .toIndexedSeq()}
    </svg>
  );
};

export { WireLayer, Props };
