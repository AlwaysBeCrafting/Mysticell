import { ParamType } from ".";

interface TerminalDescription {
  name: string;
  type: ParamType;
}

interface TerminalReference {
  id: string;
  sign: "+" | "-";
  index: number;
}

export { TerminalDescription, TerminalReference };
