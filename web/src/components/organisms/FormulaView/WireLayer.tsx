import classNames from "classnames";
import React from "react";

import { CommonAttributes } from "~/common/types";
import { WireView } from "~/components/atoms";
import { useWireList } from "~/data/Wire";

interface Props extends CommonAttributes {
  formulaId: string;
}

const WireLayer = (props: Props) => {
  const { className, formulaId } = props;

  const [wires] = useWireList(formulaId);

  return (
    <svg className={classNames("WireLayer", className)}>
      {wires.toIndexedSeq().map(wireId => (
        <WireView wireId={wireId} key={wireId} />
      ))}
    </svg>
  );
};

export { WireLayer, Props };
