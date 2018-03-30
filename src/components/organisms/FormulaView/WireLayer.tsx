import classNames from "classnames";
import { Seq } from "immutable";
import React from "react";
import { connect } from "react-redux";

import { Position2d } from "common/types";

import { AppState } from "data/AppState";
import { EntityTable, terminalPosition } from "data/common";
import { Node } from "data/Node";
import { Source } from "data/Source";
import { Wire } from "data/Wire";

interface OwnProps {
  className?: string;
  sourceId: string;
}

interface StateProps {
  wires: Seq.Indexed<Wire>;
  sources: EntityTable<Source>;
  nodes: EntityTable<Node>;
}

type Props = OwnProps & StateProps;

// FIXME: This gets its own atom
const WireView = (_: { startPos: Position2d; endPos: Position2d }) => (
  <div className="dummyWire">Fix wires!</div>
);

class PartialWireLayer extends React.PureComponent<Props> {
  render() {
    const { className, wires, nodes, sources } = this.props;
    const getTerminalPosition = terminalPosition(nodes, sources);
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

const mapStateToProps = (state: AppState, props: OwnProps): StateProps => ({
  nodes: state.entities.nodes,
  sources: state.entities.sources,
  wires: state.entities.wireSources
    .toSeq()
    .filter(sourceId => sourceId === props.sourceId)
    .map((_, wireId) => state.entities.wires.get(wireId, new Wire()))
    .toIndexedSeq(),
});

const WireLayer = connect<StateProps, {}, OwnProps, AppState>(mapStateToProps)(
  PartialWireLayer,
);

export { WireLayer };
