import React from "react";

import { GraphCardTemplate, isProperty } from "data/CardTemplate";

import { Pin } from "components/atoms";

import "./Boundary.scss";

interface CommonProps {
  template: GraphCardTemplate;
}
interface InputProps extends CommonProps {
  input: true;
  output?: undefined;
  onValueChange: (template: string, index: number, newValue: string) => void;
}
interface OutputProps extends CommonProps {
  input?: undefined;
  output: true;
}
type Props = InputProps | OutputProps;

class Boundary extends React.PureComponent<Props> {
  render() {
    const { input, template } = this.props;
    const wireAnchor = input ? "start" : "end";
    const nodes = template.graph.nodes.filter(
      node => node.type === "boundary" && node.wireAnchor === wireAnchor,
    );
    const nodeNames = input ? template.inputNames : template.outputNames;

    return (
      <div className={`boundary mod-${wireAnchor}`}>
        <div className={`boundary-header boundary-row mod-${wireAnchor}`}>
          {wireAnchor === "start" ? "Input" : "Output"}
        </div>
        {nodes
          .map((node, id) => (
            <div className={`boundary-row mod-${wireAnchor}`} key={id}>
              <div className={`boundary-row-name mod-${wireAnchor}`}>
                {nodeNames.get(node.index)}
              </div>
              {isProperty(template) &&
                (wireAnchor === "start" ? (
                  <input
                    className={`boundary-row-value mod-${wireAnchor}`}
                    defaultValue={template.inputValues.get(node.index)}
                    onChange={this.onInputChange}
                  />
                ) : (
                  <div
                    className={`boundary-row-value mod-${wireAnchor} mod-readonly`}
                  >
                    {template.outputValues.get(node.index)!.value}
                  </div>
                ))}
              <Pin
                className={`boundary-row-pin mod-${wireAnchor}`}
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

  private onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.input) {
      const { onValueChange } = this.props;
      if (onValueChange) {
        const { template } = this.props;
        const index = +event.target.getAttribute("data-index")!;
        const value = event.target.value;
        onValueChange(template.id, index, value);
      }
    }
  };
}

export { Boundary };
