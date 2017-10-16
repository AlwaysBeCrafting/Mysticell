import React from "react";

import { Dict } from "common/types";
import { isEdgeTarget } from "data/Graph";
import { GraphNodePrototype, isProperty } from "data/NodePrototype";

import { Pin } from "components/atoms";

import { Param, PARAMS } from "data/common";

interface CommonProps {
  prototype: GraphNodePrototype;
  propertyCache: Dict<Param[]>;
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

const working = PARAMS.error("…", "Working…");

const Boundary = (props: Props) => {
  const { input, prototype, propertyCache } = props;
  const pinNames = input ? prototype.inputNames : prototype.outputNames;
  const type = input ? "input" : "output";
  const params = propertyCache[prototype.id];

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
              param={params ? params[index] : working}
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
