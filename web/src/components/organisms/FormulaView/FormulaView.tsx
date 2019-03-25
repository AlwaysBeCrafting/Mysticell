import classnames from "classnames";
import { Seq } from "immutable";
import React, { useRef } from "react";
import { Icon } from "react-atoms";

import { CommonAttributes } from "common/types";
import { ToolButton } from "components/atoms";
import { Toolbar } from "components/molecules";
import { useSource } from "data/Source";

import { Boundary } from "./Boundary";
import { WireLayer } from "./WireLayer";
import { NodeLayer } from "./NodeLayer";

import "./FormulaView.scss";

interface Props extends CommonAttributes {
  documentId: string;
  path: string;
  formulaId: string;
}

const noop = () => undefined;

const FormulaView = (props: Props) => {
  const { className, documentId, path, formulaId } = props;

  const [source] = useSource(formulaId);

  const grid = useRef(null);

  return (
    <div className={classnames("FormulaView", className)}>
      <Toolbar className="FormulaView-toolbar">
        <ToolButton to={`/d/${documentId}`}>
          <Icon name="close" />
        </ToolButton>
        {path.split("/").map((segment, i) => (
          <span
            key={i}
            className={classnames("FormulaView-toolbar-path-segment", {
              "mod-final": i === Seq.Indexed(path).count() - 1,
            })}
          >
            {segment}
          </span>
        ))}
      </Toolbar>
      <div className="FormulaView-graph">
        <Boundary
          className="FormulaView-graph-boundary mod-input"
          input
          source={source}
          onValueChange={noop}
        />
        <Boundary
          className="FormulaView-graph-boundary mod-output"
          output
          source={source}
        />
        <div className="FormulaView-graph-grid" ref={grid}>
          <WireLayer
            className="FormulaView-graph-grid-wires"
            formulaId={formulaId}
          />
          <NodeLayer
            className="FormulaView-graph-grid-nodes"
            formulaId={formulaId}
          />
        </div>
      </div>
    </div>
  );
};

export { FormulaView, Props };
