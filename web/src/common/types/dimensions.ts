import { ValueObject } from "immutable";

import { hashAll } from "~/common/utils";

class Rect implements ValueObject {
  constructor(
    readonly left: number = 0,
    readonly top: number = 0,
    readonly right: number = 0,
    readonly bottom: number = 0,
  ) {}

  get width(): number {
    return this.right - this.left;
  }

  get height(): number {
    return this.bottom - this.top;
  }

  equals(other: Rect): boolean {
    return (
      other.left === this.left &&
      other.top === this.top &&
      other.right === this.right &&
      other.bottom === this.bottom
    );
  }

  hashCode(): number {
    return hashAll(this.left, this.top, this.right, this.bottom);
  }
}

class Size2d implements ValueObject {
  constructor(readonly width: number = 0, readonly height: number = 0) {}

  equals(other: Size2d): boolean {
    return other.width === this.width && other.height === this.height;
  }

  hashCode(): number {
    return hashAll(this.width, this.height);
  }
}

class Position2d implements ValueObject {
  constructor(readonly x: number = 0, readonly y: number = 0) {}

  equals(other: Position2d): boolean {
    return other.x === this.x && other.y === this.y;
  }

  hashCode(): number {
    return hashAll(this.x, this.y);
  }
}

export { Position2d, Rect, Size2d };
