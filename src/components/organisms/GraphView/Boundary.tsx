import React from "react";

import { GraphCardTemplate, isProperty } from "data/CardTemplate";

import { Pin } from "components/atoms";

import "./Boundary.scss";

interface CommonProps {
  template: GraphCardTemplate;
  onValueChange?: (prototypeId: string, node: string, newValue: string) => void;
}
interface InputProps extends CommonProps {
  input: true;
  output?: undefined;
}
interface OutputProps extends CommonProps {
  input?: undefined;
  output: true;
}
type Props = InputProps | OutputProps;

class Boundary extends React.PureComponent<Props> {
  render() {
    const { input, template } = this.props;
    const side = input ? "input" : "output";
    const nodes = template.graph.nodes.filter(
      node => node.type === "boundary" && node.side === side,
    );
    const nodeNames = input ? template.inputNames : template.outputNames;

    return (
      <div className={`boundary mod-${side}`}>
        <div className={`boundary-header boundary-row mod-${side}`}>{side}</div>
        {nodes
          .map((node, id) => (
            <div className={`boundary-row mod-${side}`} key={id}>
              <div className={`boundary-row-name mod-${side}`}>
                {nodeNames.get(node.index)}
              </div>
              {isProperty(template) &&
                (side === "input" ? (
                  <input className={`boundary-row-value mod-${side}`} />
                ) : (
                  <div
                    className={`boundary-row-value mod-${side} mod-readonly`}
                  />
                ))}
              <Pin
                className={`boundary-row-pin mod-${side}`}
                id={id}
                node={node}
                onConnect={this.onPinConnect}
              />
            </div>
          ))
          .toIndexedSeq()}
      </div>
    );
  }

  private onPinConnect = (from: string, to: string) => {
    // FINISHME
    // tslint:disable-next-line:no-console
    console.log(from, to);
  };
}

export { Boundary };
