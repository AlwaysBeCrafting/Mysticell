import classNames from "classnames";
import React from "react";

import { Wire } from "components/atoms";

import { GraphCardTemplate } from "data/CardTemplate";
import { Palette } from "data/Palette";

interface Props {
  className?: string;
  template: GraphCardTemplate;
  palette: Palette;
}

class WireLayer extends React.PureComponent<Props> {
  render() {
    const { template, className } = this.props;
    return (
      <svg className={classNames("wireLayer", className)}>
        {template.graph.edges
          .filter(type => type === "external")
          .map(this.renderWire)
          .toIndexedSeq()}
      </svg>
    );
  }

  private renderWire = (
    _: "external",
    edge: { source: string; target: string },
  ) => {
    const { template, palette } = this.props;
    const { source, target } = edge;
    const sourcePos = template.nodePosition(source, palette);
    const targetPos = template.nodePosition(target, palette);
    return (
      <Wire
        srcPos={sourcePos}
        tgtPos={targetPos}
        key={`${edge.source}-${edge.target}`}
      />
    );
  };
}

export { WireLayer };
