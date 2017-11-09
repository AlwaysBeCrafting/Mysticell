import classNames from "classnames";
import React from "react";

import { Wire } from "components/atoms";

import { Position2d } from "common/types";

import { GraphCardTemplate, nodePosition } from "data/CardTemplate";
import { Palette } from "data/Palette";

interface Props {
  className?: string;
  template: GraphCardTemplate;
  palette: Palette;
}

class WireLayer extends React.PureComponent<Props> {
  render() {
    const { template, palette, className } = this.props;
    return (
      <svg className={classNames("wireLayer", className)}>
        {template.graph.edges
          .filter(type => type === "external")
          .map((_: "external", edge: { source: string; target: string }) => {
            const { source, target } = edge;
            const sourcePos = nodePosition(template, source, palette);
            const targetPos = nodePosition(template, target, palette);
            return (
              <Wire
                startPos={new Position2d(sourcePos.x * 40, sourcePos.y * 40)}
                endPos={new Position2d(targetPos.x * 40, targetPos.y * 40)}
                key={`${edge.source}-${edge.target}`}
              />
            );
          })
          .toIndexedSeq()}
      </svg>
    );
  }
}

export { WireLayer };
