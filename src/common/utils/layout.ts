import { Position2d } from "common/types";

const elementRelativePosition = (
  element: HTMLElement,
  absolutePosition: Position2d,
): Position2d => {
  const rect = element.getBoundingClientRect();
  return new Position2d(
    absolutePosition.x - rect.left,
    absolutePosition.y - rect.top,
  );
};

export { elementRelativePosition };
