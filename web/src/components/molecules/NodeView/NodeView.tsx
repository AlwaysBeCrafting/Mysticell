import classNames from "classnames";
import { Seq } from "immutable";
import React from "react";
import { Card } from "react-atoms";
import { connect } from "react-redux";

import { TerminalView } from "components/atoms";

import { AppState } from "data/AppState";
import { TerminalReference } from "data/common";
import { Node } from "data/Node";
import { PRIMITIVE_SOURCES } from "data/Primitive";
import { Source } from "data/Source";

import "./NodeView.scss";

interface OwnProps {
  className?: string;
  style?: React.CSSProperties;
  nodeId: string;
}

interface StateProps {
  node: Node;
  source: Source;
  isDragging: boolean;
  connections: Iterable<TerminalReference>;
}

type Props = OwnProps & StateProps;

class PartialNodeView extends React.PureComponent<Props> {
  render() {
    const { className, style, node, source, isDragging } = this.props;
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
        className={classNames("nodeView", className)}
        style={{ ...positionedStyle, ...style }}
      >
        <header className="nodeView-header nodeView-row">
          <span className="nodeView-header-name">{label || name}</span>
        </header>
        {Seq.Indexed(outputs).map((term, index) => {
          const reference = new TerminalReference(node.id, "+", index);
          return (
            <TerminalView
              key={reference.hashCode()}
              className="nodeView-terminal"
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
              className="nodeView-terminal"
              reference={reference}
              description={term}
            />
          );
        })}
      </Card>
    );
  }
}

const mapStateToProps = (state: AppState, props: OwnProps): StateProps => {
  const node = state.entities.nodes.get(props.nodeId, new Node());
  return {
    node,
    source: state.entities.sources
      .toSeq()
      .concat(PRIMITIVE_SOURCES)
      .get(node.source, new Source()),
    isDragging: false,
    connections: [],
  };
};

const NodeView = connect<StateProps, {}, OwnProps, AppState>(mapStateToProps)(
  PartialNodeView,
);

export { NodeView };
