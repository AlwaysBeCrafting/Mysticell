import classnames from "classnames";
import { Seq } from "immutable";
import React, { useRef } from "react";
import { Icon } from "react-atoms";

import { CommonAttributes } from "common/types";

import { ToolButton } from "components/atoms";
import { Toolbar } from "components/molecules";

import { Source } from "data/Source";

import { Boundary } from "./Boundary";
import { ConnectedNodeLayer } from "./ConnectedNodeLayer";
import { ConnectedWireLayer } from "./ConnectedWireLayer";

import "./FormulaView.scss";

interface Props extends CommonAttributes {
  documentId: string;
  path: Seq.Indexed<string>;
  source: Source;
  nodeIds: Iterable<string>;
  wireIds: Iterable<string>;
}

const noop = () => undefined;

const FormulaView = (props: Props) => {
  const { className, documentId, path, source } = props;

  const grid = useRef(null);

  return (
    <div className={classnames("FormulaView", className)}>
      <Toolbar className="FormulaView-toolbar">
        <ToolButton to={`/d/${documentId}`}>
          <Icon name="close" />
        </ToolButton>
        {path.map((segment: string, i: number) => (
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
          <ConnectedWireLayer
            className="FormulaView-graph-grid-wires"
            sourceId={source.id}
          />
          <ConnectedNodeLayer
            className="FormulaView-graph-grid-nodes"
            sourceId={source.id}
          />
        </div>
      </div>
    </div>
  );
};

export { FormulaView, Props };
