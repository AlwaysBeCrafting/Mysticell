import c from "classnames";
import React from "react";

import { TerminalDescription, TerminalReference } from "data/common";

import "./TerminalView.scss";

const signWord = (sign: "+" | "-") => (sign === "+" ? "plus" : "minus");

interface Props {
  className?: string;
  reference: TerminalReference;
  description: TerminalDescription;
  value?: string;
  onInput?: (newValue: string, reference: TerminalReference) => void;
  onConnect?: (
    otherReference: TerminalReference,
    selfReference: TerminalReference,
  ) => void;
  onDisconnect?: (selfReference: TerminalReference) => void;
}

class TerminalView extends React.PureComponent<Props> {
  render() {
    const { className, reference, description } = this.props;
    const { sign } = reference;

    const signMod = `mod-${signWord(sign)}`;

    return (
      <div className={c("terminalView", className, signMod)}>
        <div className={c("terminalView-name", signMod)}>
          {description.name}
        </div>
        {this.renderValue(signMod)}
        <div className={c("terminalView-pin", signMod)} />
      </div>
    );
  }

  private renderValue(signMod: string) {
    const { reference, value } = this.props;
    const { sign } = reference;
    if (value === undefined) {
      return null;
    }
    if (sign === "+") {
      return (
        <div className={c("terminalView-value mod-readonly", signMod)}>
          {value}
        </div>
      );
    } else {
      return (
        <input
          className={c("terminalView-value", signMod)}
          defaultValue={value}
          onChange={this.onInput}
        />
      );
    }
  }

  private onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onInput, reference } = this.props;
    if (onInput) {
      onInput(event.target.value, reference);
    }
  };
}

export { TerminalView };
