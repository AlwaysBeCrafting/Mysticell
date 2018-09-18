import { ReactNode, CSSProperties } from "react";

interface CommonAttributes {
  className?: string;
  style?: CSSProperties;
}

interface ParentAttributes {
  children: ReactNode;
}

export { CommonAttributes, ParentAttributes };
