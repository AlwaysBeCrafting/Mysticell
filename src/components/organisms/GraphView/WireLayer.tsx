import classNames from "classnames";
import React from "react";

import { Wire } from "components/atoms";

import { GraphCardTemplate } from "data/CardTemplate";
import { Palette } from "data/Palette";

interface Props {
  template: GraphCardTemplate;
  palette: Palette;
  className?: string;
}

class WireLayer extends React.PureComponent<Props> {
  render() {
    const { template, className } = this.props;
    return (
      <svg className={classNames("wireLayer", className)}>
        {template.graph.edges
          .filter(type => type === "external")
          .map(this.renderWire)}
      </svg>
    );
  }

  private renderWire(_: "external", edge: { source: string; target: string }) {
    const { template, palette } = this.props;
    const sourcePos = template.nodePosition(edge.source, palette);
    const targetPos = template.nodePosition(edge.target, palette);
    return (
      <Wire
        srcPos={sourcePos}
        tgtPos={targetPos}
        key={`${edge.source}-${edge.target}`}
      />
    );
  }
}

export { WireLayer };
