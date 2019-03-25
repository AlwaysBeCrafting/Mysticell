import classNames from "classnames";
import { Seq } from "immutable";
import React from "react";
import { Card } from "react-atoms";

import { TerminalView } from "components/atoms";
import { CommonAttributes } from "common/types";
import { TerminalPointer } from "data/common";
import { useNode } from "data/Node";
import { useSource } from "data/Source";

import "./NodeView.scss";

interface Props extends CommonAttributes {
  nodeId: string;
  isDragging: boolean;
  connections: Iterable<TerminalPointer>;
}

const NodeView = (props: Props) => {
  const { className, nodeId, isDragging } = props;

  const [node] = useNode(nodeId);
  if (!node) return null;
  const { label, position } = node;

  const [source] = useSource(node.sourceId);
  if (!source) return null;
  const { path, inputs, outputs } = source;

  const height = 1 + inputs.count() + outputs.count();
  const positionedStyle = {
    gridRow: `${position.y + 1} / span ${height}`,
    gridColumn: `${position.x + 1} / span 4`,
    opacity: isDragging ? 0.6 : 1,
  };
  return (
    <Card className={classNames("NodeView", className)} style={positionedStyle}>
      <header className="NodeView-header NodeView-row">
        <span className="NodeView-header-name">{label || path}</span>
      </header>
      {Seq.Indexed(outputs).map((term, index) => {
        const pointer = new TerminalPointer(node.id, index);
        return (
          <TerminalView
            key={pointer.hashCode()}
            className="NodeView-terminal"
            pointer={pointer}
            description={term}
          />
        );
      })}
      {Seq.Indexed(inputs).map((term, index) => {
        const pointer = new TerminalPointer(node.id, index);
        return (
          <TerminalView
            key={pointer.hashCode()}
            className="NodeView-terminal"
            pointer={pointer}
            description={term}
          />
        );
      })}
    </Card>
  );
};

export { NodeView };
