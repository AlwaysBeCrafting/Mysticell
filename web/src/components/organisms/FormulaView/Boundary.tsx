import c from "classnames";
import { Seq } from "immutable";
import React from "react";

import { TerminalView } from "~/components/atoms";

import { TerminalPointer } from "~/data/common";
import { Source } from "~/data/Source";

import "./Boundary.scss";

const signWord = (sign: "+" | "-") => (sign === "+" ? "plus" : "minus");

interface CommonProps {
  className?: string;
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

const Boundary = (props: Props) => {
  const { className, input, source, values } = props;
  const sign = input ? "+" : "-";
  const terminals = input ? source.inputs : source.outputs;

  const signMod = `mod-${signWord(sign)}`;

  return (
    <div className={c(className, "Boundary", signMod)}>
      <div className={c("Boundary-header Boundary-row", signMod)}>
        {sign === "+" ? "Input" : "Output"}
      </div>
      {terminals
        .zip(values || terminals.map(_ => ""))
        .map(([term, value], index) => {
          const pointer = new TerminalPointer(source.id, index);
          return (
            <TerminalView
              key={pointer.hashCode()}
              className="Boundary-terminal"
              description={term}
              pointer={pointer}
              value={value}
            />
          );
        })
        .toIndexedSeq()}
    </div>
  );
};

export { Boundary };
