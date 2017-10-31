import { Record } from "immutable";

interface Rect2dProps {
  left: number;
  top: number;
  right: number;
  bottom: number;
}
class Rect2d extends Record<Rect2dProps>({
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
}) {}

interface Size2dProps {
  width: number;
  height: number;
}
class Size2d extends Record<Size2dProps>({
  width: 0,
  height: 0,
}) {}

interface Position2dProps {
  x: number;
  y: number;
}
class Position2d extends Record<Position2dProps>({
  x: 0,
  y: 0,
}) {
  public static fromJson(json: any) {
    const { x, y } = json;
    return new Position2d({ x, y });
  }
}

export { Position2d, Rect2d, Size2d };
