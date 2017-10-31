import { List, Map } from "immutable";
import React from "react";

import { isEdgeTarget } from "data/Graph";
import { GraphNodePrototype, isProperty } from "data/NodePrototype";

import { Pin } from "components/atoms";

import { Param, PARAMS } from "data/common";

interface CommonProps {
  prototype: GraphNodePrototype;
  propertyCache: Map<string, List<Param>>;
  onValueChange?: (
    prototypeId: string,
    index: number,
    newValue: string,
  ) => void;
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

class Boundary extends React.PureComponent<Props> {
  public render() {
    const { input, prototype, propertyCache } = this.props;
    const pinNames = input ? prototype.inputNames : prototype.outputNames;
    const type = input ? "input" : "output";
    const params = propertyCache.get(prototype.id);
    const defaultParam = isProperty(prototype) ? working : undefined;

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
              ? prototype.inputValues.get(index)
              : "";
            return (
              <Pin
                nodeId="input"
                source
                takesInput={isProperty(prototype)}
                name={name}
                userValue={userValue}
                index={index}
                key={name}
                onChange={this.onPinValueChange}
              />
            );
          } else {
            return (
              <Pin
                nodeId="output"
                target
                takesInput={!isEdgeTarget(prototype.graph, "output", index)}
                name={name}
                param={params ? params.get(index) : defaultParam}
                index={index}
                key={name}
              />
            );
          }
        })}
      </div>
    );
  }

  private onPinValueChange = (index: number, newValue: string) => {
    const { onValueChange } = this.props;
    if (onValueChange) {
      onValueChange(this.props.prototype.id, index, newValue);
    }
  };
}

export { Boundary };
