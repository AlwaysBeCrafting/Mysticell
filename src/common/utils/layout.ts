import { Dict } from "common/types";

type Layout = Dict<[number, number]>;

const graphLayoutWidth = (layout: Layout) =>
  Object.keys(layout)
    .map(key => layout[key])
    .reduce((max, current) => Math.max(current[0], max), 2) + 6;

const nodeHeaderRows = 1;
const panelHeaderRows = 2;
const nodeWidth = 4;

const sourcePinPosition = (layout: Layout, srcId: string, srcIndex: number) => {
  const srcPos: [number, number] = [0, 0];
  if (srcId === "input") {
    srcPos[1] += panelHeaderRows;
  } else {
    srcPos[0] += layout[srcId][0];
    srcPos[1] += layout[srcId][1];
    srcPos[0] += nodeWidth;
    srcPos[1] += nodeHeaderRows;
  }
  srcPos[1] += srcIndex;
  return srcPos;
};

const targetPinPosition = (
  layout: Layout,
  offset: number,
  tgtId: string,
  tgtIndex: number,
) => {
  const tgtPos: [number, number] = [0, 0];
  if (tgtId === "output") {
    tgtPos[0] = graphLayoutWidth(layout);
    tgtPos[1] += panelHeaderRows;
  } else {
    tgtPos[0] = layout[tgtId][0];
    tgtPos[1] = layout[tgtId][1];
    tgtPos[1] += nodeHeaderRows;
    tgtPos[1] += offset;
  }
  tgtPos[1] += tgtIndex;
  return tgtPos;
};

export { graphLayoutWidth, sourcePinPosition, targetPinPosition };
