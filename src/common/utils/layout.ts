import { Map } from "immutable";

import { Position2d } from "common/types";

type Layout = Map<string, Position2d>;

const graphLayoutWidth = (layout: Layout) =>
  layout.reduce((max, current) => Math.max(current.x, max), 2) + 6;

const nodeHeaderRows = 1;
const panelHeaderRows = 2;
const nodeWidth = 4;

const sourcePinPosition = (layout: Layout, srcId: string, srcIndex: number) =>
  srcId === "input"
    ? new Position2d({
        y: panelHeaderRows + srcIndex,
      })
    : new Position2d({
        x: layout.get(srcId, new Position2d()).x + nodeWidth,
        y: layout.get(srcId, new Position2d()).y + nodeHeaderRows + srcIndex,
      });

const targetPinPosition = (
  layout: Layout,
  offset: number,
  tgtId: string,
  tgtIndex: number,
) =>
  tgtId === "output"
    ? new Position2d({
        x: graphLayoutWidth(layout),
        y: panelHeaderRows + tgtIndex,
      })
    : new Position2d({
        x: layout.get(tgtId, new Position2d()).x,
        y: layout.get(tgtId, new Position2d()).y + nodeHeaderRows + offset,
      });

const elementRelativePosition = (
  element: HTMLElement,
  absolutePosition: Position2d,
): Position2d =>
  absolutePosition.withMutations(pos => {
    const rect = element.getBoundingClientRect();
    pos.set("x", pos.x - rect.left).set("y", pos.y - rect.top);
  });

export {
  elementRelativePosition,
  graphLayoutWidth,
  sourcePinPosition,
  targetPinPosition,
};
