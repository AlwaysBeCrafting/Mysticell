import { Seq } from "immutable";
import React from "react";

import { Pin } from "components/atoms";

import { Source } from "data/Source";

import "./Boundary.scss";
import { TerminalDescription } from "data/common";

interface CommonProps {
  source: Source;
  values?: Seq.Indexed<string>;
}
interface InputProps extends CommonProps {
  input: true;
  output?: undefined;
  onValueChange?: (template: string, index: number, newValue: string) => void;
}
interface OutputProps extends CommonProps {
  input?: undefined;
  output: true;
}
type Props = InputProps | OutputProps;

class Boundary extends React.PureComponent<Props> {
  render() {
    const { input, values, source } = this.props;
    const sign = input ? "source" : "sink";
    const terminals = input ? source.inputs : source.outputs;

    return (
      <div className={`boundary mod-${sign}`}>
        <div className={`boundary-header boundary-row mod-${sign}`}>
          {sign === "source" ? "Input" : "Output"}
        </div>
        {terminals
          .map((term, index) => (
            <div className={`boundary-row mod-${sign}`} key={index}>
              <div className={`boundary-row-name mod-${sign}`}>{term.name}</div>
              {this.renderValue(sign, values && values.get(index))}
              <Pin
                className={`boundary-row-pin mod-${sign}`}
                id={"id"}
                node={"node"}
                onConnect={this.onPinConnect}
              />
            </div>
          ))
          .toIndexedSeq()}
      </div>
    );
  }

  private renderValue(sign: "source" | "sink", value?: string) {
    if (value === undefined) {
      return null;
    }

    if (sign === "source") {
      return (
        <input
          className={`boundary-row-value mod-${sign}`}
          defaultValue={value}
          onChange={this.onInputChange}
        />
      );
    } else {
      return (
        <div className={`boundary-row-value mod-${sign} mod-readonly`}>
          {value}
        </div>
      );
    }
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
        const { source } = this.props;
        const index = +event.target.getAttribute("data-index")!;
        const value = event.target.value;
        onValueChange(source.id, index, value);
      }
    }
  };
}

export { Boundary };
