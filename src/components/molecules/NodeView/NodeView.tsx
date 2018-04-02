import classNames from "classnames";
import { Collection, Seq, Set } from "immutable";
import React from "react";
import { Card } from "react-atoms";
import { connect } from "react-redux";

import { Pin } from "components/atoms";

import { TerminalDescription, TerminalReference } from "data/common";
import { Node } from "data/Node";

import { AppState } from "data/AppState";
import { Source } from "data/Source";
import "./NodeView.scss";

interface OwnProps {
  className?: string;
  style?: React.CSSProperties;
  nodeId: string;
}

interface StateProps {
  node: Node;
  name: string;
  inputs: Iterable<TerminalDescription>;
  outputs: Iterable<TerminalDescription>;
  height: number;
  isDragging: boolean;
  connections:
    | Collection.Indexed<TerminalReference>
    | Collection.Set<TerminalReference>;
}

type Props = OwnProps & StateProps;

class PartialNodeView extends React.PureComponent<Props> {
  render() {
    const {
      className,
      style,
      node,
      name,
      inputs,
      outputs,
      height,
      isDragging,
    } = this.props;
    const { label, position } = node;

    const positionedStyle = {
      gridRow: `${position.y + 1} / span ${height}`,
      gridColumn: `${position.x + 1} / span 4`,
      opacity: isDragging ? 0.6 : 1,
    };
    return (
      <Card
        className={classNames("nodeView", className)}
        style={{ ...positionedStyle, style }}
      >
        <header className="nodeView-header nodeView-row">
          <span className="nodeView-header-name">{label || name}</span>
        </header>
        {Seq(outputs).map((term, index) => {
          const ref = new TerminalReference(node.id, "-", index);
          return (
            <div className="nodeView-row mod-output" key={`${ref.hashCode}`}>
              <div className="nodeView-row-name mod-output">{term.name}</div>
              <Pin className="nodeView-row-pin mod-output" type="undefined" />
            </div>
          );
        })}
        {Seq(inputs).map((term, index) => {
          const ref = new TerminalReference(node.id, "+", index);
          return (
            <div className="nodeView-row mod-input" key={`${ref.hashCode}`}>
              <div className="nodeView-row-name mod-input">{term.name}</div>
            </div>
          );
        })}
      </Card>
    );
  }
}

const mapStateToProps = (state: AppState, props: OwnProps): StateProps => {
  const node = state.entities.nodes.get(props.nodeId, new Node());
  const source = state.entities.sources.get(node.source, new Source());
  return {
    node,
    name: source.name,
    inputs: source.inputs,
    outputs: source.outputs,
    height: 1 + source.inputs.count() + source.outputs.count(),
    isDragging: false,
    connections: Set(),
  };
};

const NodeView = connect<StateProps, {}, OwnProps, AppState>(mapStateToProps)(
  PartialNodeView,
);

export { NodeView };
