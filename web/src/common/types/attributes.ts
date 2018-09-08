import { ReactNode } from "react";

interface CommonAttributes {
  className?: string;
}

interface ParentAttributes {
  children: ReactNode;
}

export { CommonAttributes, ParentAttributes };
