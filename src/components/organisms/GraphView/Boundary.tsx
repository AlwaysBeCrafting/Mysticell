import React from "react";

import { GraphCardTemplate } from "data/CardTemplate";

import { Pin } from "components/atoms";

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
        <div className={`boundary-heading mod-${side}`}>{side}</div>
        {nodes.map((node, id) => (
          <div className={`boundary-node mod-${side}`}>
            <div className={`boundary-node-name mod-${side}`}>
              {nodeNames.get(node.index)}
            </div>
            <Pin
              className={`boundary-node-pin mod-${side}`}
              key={id}
              id={id}
              node={node}
              onConnect={this.onPinConnect}
            />
          </div>
        ))}
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
