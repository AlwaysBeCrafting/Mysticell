import classNames from "classnames";
import React from "react";

import { CommonAttributes } from "common/types";

import { Terminal, TerminalPointer } from "data/common";

import "./TerminalView.scss";

const signWord = (sign: "+" | "-") => (sign === "+" ? "plus" : "minus");

interface Props extends CommonAttributes {
  pointer: TerminalPointer;
  description: Terminal;
  value?: string;
  onInput?: (newValue: string, reference: TerminalPointer) => void;
  onConnect?: (
    otherReference: TerminalPointer,
    selfReference: TerminalPointer,
  ) => void;
  onDisconnect?: (selfReference: TerminalPointer) => void;
}

class TerminalView extends React.PureComponent<Props> {
  render() {
    const { className, description } = this.props;

    const signMod = `mod-${signWord("+")}`;

    return (
      <div className={classNames("TerminalView", className, signMod)}>
        <div className={classNames("TerminalView-name", signMod)}>
          {description.name}
        </div>
        {this.renderValue(signMod)}
        <div className={classNames("TerminalView-pin", signMod)} />
      </div>
    );
  }

  private renderValue(signMod: string) {
    const { value } = this.props;
    const sign = "+";
    if (value === undefined) {
      return null;
    }
    if (sign === "+") {
      return (
        <div className={classNames("TerminalView-value mod-readonly", signMod)}>
          {value}
        </div>
      );
    } else {
      return (
        <input
          className={classNames("TerminalView-value", signMod)}
          defaultValue={value}
          onChange={this.onInput}
        />
      );
    }
  }

  private onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onInput, pointer } = this.props;
    if (onInput) {
      onInput(event.target.value, pointer);
    }
  };
}

export { TerminalView };
