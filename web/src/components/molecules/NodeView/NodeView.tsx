import classNames from "classnames";
import { Seq } from "immutable";
import React from "react";
import { Card } from "react-atoms";

import { TerminalView } from "components/atoms";

import { TerminalReference } from "data/common";
import { Node } from "data/Node";
import { Source } from "data/Source";

import "./NodeView.scss";
import { CommonAttributes } from "common/types";

interface Props extends CommonAttributes {
  node: Node;
  source: Source;
  isDragging: boolean;
  connections: Iterable<TerminalReference>;
}

class NodeView extends React.PureComponent<Props> {
  render() {
    const { className, node, source, isDragging } = this.props;
    const { label, position } = node;
    const { name, inputs, outputs } = source;
    const height = 1 + inputs.count() + outputs.count();
    const positionedStyle = {
      gridRow: `${position.y + 1} / span ${height}`,
      gridColumn: `${position.x + 1} / span 4`,
      opacity: isDragging ? 0.6 : 1,
    };
    return (
      <Card
        className={classNames("NodeView", className)}
        style={positionedStyle}
      >
        <header className="NodeView-header NodeView-row">
          <span className="NodeView-header-name">{label || name}</span>
        </header>
        {Seq.Indexed(outputs).map((term, index) => {
          const reference = new TerminalReference(node.id, "+", index);
          return (
            <TerminalView
              key={reference.hashCode()}
              className="NodeView-terminal"
              reference={reference}
              description={term}
            />
          );
        })}
        {Seq.Indexed(inputs).map((term, index) => {
          const reference = new TerminalReference(node.id, "-", index);
          return (
            <TerminalView
              key={reference.hashCode()}
              className="NodeView-terminal"
              reference={reference}
              description={term}
            />
          );
        })}
      </Card>
    );
  }
}

export { NodeView, Props };
