import classNames from "classnames";
import React from "react";
import { connect } from "react-redux";
import Redux from "redux";

import { CardView } from "components/molecules";

import { Card } from "data/Card";
import { connectNodes, GraphCardTemplate } from "data/CardTemplate";
import { Palette } from "data/Palette";

import "./NodeLayer.scss";

interface DispatchProps {
  dispatch: Redux.Dispatch<Redux.Action>;
}
interface OwnProps {
  template: GraphCardTemplate;
  palette: Palette;
  className?: string;
}
type Props = DispatchProps & OwnProps;

class PartialNodeLayer extends React.PureComponent<Props> {
  render() {
    const { palette, template, className } = this.props;

    return (
      <div className={classNames("nodeLayer", className)}>
        {template.cards
          .map((card: Card) => (
            <CardView
              key={card.id}
              snapshot={card.snapshot(palette)}
              nodes={template.graph.nodes.filter(
                node => node.type === "card" && node.card === card.id,
              )}
              onInputChange={this.onCardInputChange}
              onConnect={this.onConnect}
            />
          ))
          .toIndexedSeq()}
      </div>
    );
  }

  private onCardInputChange = (
    template: string,
    card: string,
    index: number,
    value: string,
  ) => {
    // tslint:disable-next-line:no-console
    console.log(template, card, index, value);
  };

  private onConnect = (source: string, target: string) => {
    this.props.dispatch(connectNodes(this.props.template.id, source, target));
  };
}

const NodeLayer = connect<{}, DispatchProps, OwnProps>(
  () => ({}),
  dispatch => ({ dispatch }),
)(PartialNodeLayer);

export { NodeLayer };
