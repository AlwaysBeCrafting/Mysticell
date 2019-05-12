import classNames from "classnames";
import React, { useCallback } from "react";

import { CommonAttributes } from "~/common/types";

import { Terminal, TerminalPointer } from "~/data/common";

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

const TerminalView = (props: Props) => {
  const { className, pointer, description, value } = props;

  const signMod = `mod-${signWord("+")}`;

  const onInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (props.onInput) {
        props.onInput(event.target.value, pointer);
      }
    },
    [props.onInput, pointer],
  );

  const renderValue = () => {
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
          onChange={onInput}
        />
      );
    }
  };

  return (
    <div className={classNames("TerminalView", className, signMod)}>
      <div className={classNames("TerminalView-name", signMod)}>
        {description.name}
      </div>
      {renderValue()}
      <div className={classNames("TerminalView-pin", signMod)} />
    </div>
  );
};

export { TerminalView };
