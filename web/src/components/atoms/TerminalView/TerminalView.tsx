import classNames from "classnames";
import React from "react";

import { CommonAttributes } from "common/types";

import { TerminalDescription, TerminalReference } from "data/common";

import "./TerminalView.scss";

const signWord = (sign: "+" | "-") => (sign === "+" ? "plus" : "minus");

interface Props extends CommonAttributes {
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
    const { reference, value } = this.props;
    const { sign } = reference;
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
    const { onInput, reference } = this.props;
    if (onInput) {
      onInput(event.target.value, reference);
    }
  };
}

export { TerminalView };
