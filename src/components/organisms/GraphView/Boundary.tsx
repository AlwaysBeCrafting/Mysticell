import React from "react";

import { PARAMS } from "data/common";

import { Pin } from "components/atoms";

import { isEdgeTarget } from "data/Graph";
import { GraphNodePrototype, isProperty } from "data/NodePrototype";

interface CommonProps {
  prototype: GraphNodePrototype;
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

const Boundary = (props: Props) => {
  const { input, prototype } = props;
  const pinNames = input ? prototype.inputNames : prototype.outputNames;
  const type = input ? "input" : "output";

  return (
    <div className={`graphView-graph-panel graphView-graph-${type}Panel`}>
      <div
        className={`graphView-graph-panel-heading graphView-graph-${type}Panel-heading`}
      >
        {type}
      </div>
      {pinNames.map((name, index) => {
        if (type === "input") {
          const userValue = isProperty(prototype)
            ? prototype.inputValues[index]
            : "";
          return (
            <Pin
              source
              takesInput={isProperty(prototype)}
              name={name}
              param={PARAMS.string("")}
              userValue={userValue}
              index={index}
              key={name}
            />
          );
        } else {
          return (
            <Pin
              target
              takesInput={!isEdgeTarget(prototype.graph, "output", index)}
              name={name}
              param={PARAMS.empty()}
              userValue={""}
              index={index}
              key={name}
            />
          );
        }
      })}
    </div>
  );
};

export { Boundary };
