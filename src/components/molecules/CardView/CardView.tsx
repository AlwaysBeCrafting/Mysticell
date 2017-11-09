import classNames from "classnames";
import { Map } from "immutable";
import React from "react";
import {
  ConnectDragPreview,
  ConnectDragSource,
  DragSource,
  DragSourceCollector,
  DragSourceSpec,
} from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import { DndTypes } from "common/types";

import { Pin } from "components/atoms";

import { CardSnapshot } from "data/Card";
import { NodeValue } from "data/CardTemplate";

import "./CardView.scss";

interface OwnProps {
  className?: string;
  style?: React.CSSProperties;
  snapshot: CardSnapshot;
  nodes?: Map<string, NodeValue>;
  onInputChange?: (
    template: string,
    card: string,
    index: number,
    newValue: string,
  ) => void;
  onConnect?: (from: string, to: string) => void;
}
interface DragProps {
  connectDrag: ConnectDragSource;
  connectPreview: ConnectDragPreview;
  isDragging: boolean;
}
type Props = OwnProps & DragProps;
class PartialCardView extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.connectPreview(getEmptyImage());
  }

  render() {
    const { className, style, snapshot, connectDrag, isDragging } = this.props;
    const { label, name, inputs, outputs, position } = snapshot;
    const nodes = this.props.nodes || Map();
    const pinCount = inputs.length + outputs.length;

    const positionedStyle = {
      gridRow: `${position.y + 1} / span ${pinCount + 1}`,
      gridColumn: `${position.x + 1} / span 4`,
      ...style,
      opacity: isDragging ? 0.6 : 1,
    };
    return connectDrag(
      <div
        className={classNames("cardView", className)}
        style={positionedStyle}
      >
        <header className="cardView-header cardView-row">
          <span className="cardView-header-name">{label || name}</span>
        </header>
        {snapshot.outputs.map((output, index) => {
          const id = `${snapshot.id}o${index}`;
          const node = nodes.findEntry(
            n => n.wireAnchor === "start" && n.index === index,
          );
          return (
            <div className="cardView-row mod-output" key={id}>
              <div className="cardView-row-name mod-output">{output.name}</div>
              <Pin
                className="cardView-row-pin mod-output"
                id={node && node[0]}
                node={node && node[1]}
                onConnect={this.props.onConnect}
              />
            </div>
          );
        })}
        {snapshot.inputs.map((input, index) => {
          const id = `${snapshot.id}i${index}`;
          const node = nodes.findEntry(
            n => n.wireAnchor === "end" && n.index === index,
          );
          return (
            <div className="cardView-row mod-input" key={id}>
              <div className="cardView-row-name mod-input">{input.name}</div>
              {input.isEditable && (
                <input
                  className="cardView-row-value"
                  defaultValue={input.value}
                  onChange={this.onInputChange}
                  data-index={index}
                />
              )}
              {input.hasPin && (
                <Pin
                  className="cardView-row-pin mod-input"
                  id={node && node[0]}
                  node={node && node[1]}
                  onConnect={this.props.onConnect}
                />
              )}
            </div>
          );
        })}
      </div>,
    );
  }

  private onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onInputChange } = this.props;
    if (onInputChange) {
      const { template, id } = this.props.snapshot;
      const index = +event.target.getAttribute("data-index")!;
      const value = event.target.value;
      onInputChange(template, id, index, value);
    }
  };
}

const dragSpec: DragSourceSpec<OwnProps> = {
  beginDrag: props => props.snapshot,
};
const dragCollect: DragSourceCollector = (connect, monitor) => ({
  connectDrag: connect.dragSource(),
  connectPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});
const CardView = DragSource(DndTypes.CARD, dragSpec, dragCollect)(
  PartialCardView,
);

export { CardView };
