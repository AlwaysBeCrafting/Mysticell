import classNames from "classnames";
import { Seq } from "immutable";
import React from "react";
import { connect } from "react-redux";

import { Position2d } from "common/types";

import { Wire as WireView } from "components/atoms";

import { AppState } from "data/AppState";
import { terminalPosition, TerminalReference } from "data/common";
import { Wire } from "data/Wire";

interface OwnProps {
  className?: string;
  sourceId: string;
}

interface StateProps {
  wires: Seq.Indexed<Wire>;
  getTerminalPosition: (terminal: TerminalReference) => Position2d;
}

type Props = OwnProps & StateProps;

class PartialWireLayer extends React.PureComponent<Props> {
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

const mapStateToProps = (state: AppState, props: OwnProps): StateProps => ({
  wires: state.entities.wireSources
    .toSeq()
    .filter(sourceId => sourceId === props.sourceId)
    .map((_, wireId) => state.entities.wires.get(wireId, new Wire()))
    .toIndexedSeq(),
  getTerminalPosition: terminalPosition(
    state.entities.nodes,
    state.entities.sources,
    state.entities.nodeSources,
  ),
});

const WireLayer = connect<StateProps, {}, OwnProps, AppState>(mapStateToProps)(
  PartialWireLayer,
);

export { WireLayer };
