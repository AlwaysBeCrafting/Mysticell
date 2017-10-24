import { Dict, Position2d } from "common/types";

type Layout = Dict<Position2d>;

const graphLayoutWidth = (layout: Layout) =>
  Object.values(layout).reduce((max, current) => Math.max(current.x, max), 2) +
  6;

const nodeHeaderRows = 1;
const panelHeaderRows = 2;
const nodeWidth = 4;

const sourcePinPosition = (layout: Layout, srcId: string, srcIndex: number) => {
  const srcPos: Position2d = { x: 0, y: 0 };
  if (srcId === "input") {
    srcPos.y += panelHeaderRows;
  } else {
    srcPos.x += layout[srcId].x;
    srcPos.y += layout[srcId].y;
    srcPos.x += nodeWidth;
    srcPos.y += nodeHeaderRows;
  }
  srcPos.y += srcIndex;
  return srcPos;
};

const targetPinPosition = (
  layout: Layout,
  offset: number,
  tgtId: string,
  tgtIndex: number,
) => {
  const tgtPos: Position2d = { x: 0, y: 0 };
  if (tgtId === "output") {
    tgtPos.x = graphLayoutWidth(layout);
    tgtPos.y += panelHeaderRows;
  } else {
    tgtPos.x = layout[tgtId].x;
    tgtPos.y = layout[tgtId].y;
    tgtPos.y += nodeHeaderRows;
    tgtPos.y += offset;
  }
  tgtPos.y += tgtIndex;
  return tgtPos;
};

const elementRelativePosition = (
  element: HTMLElement,
  absolutePosition: Position2d,
): Position2d => ({
  x: absolutePosition.x - element.getBoundingClientRect().left,
  y: absolutePosition.y - element.getBoundingClientRect().top,
});

export {
  elementRelativePosition,
  graphLayoutWidth,
  sourcePinPosition,
  targetPinPosition,
};
