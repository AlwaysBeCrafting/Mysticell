import { List } from "immutable";

interface NumberParam {
  type: "number";
  value: number;
}

interface StringParam {
  type: "string";
  value: string;
}

interface EmptyParam {
  type: "empty";
  value: undefined;
}

interface ErrorParam {
  type: "error";
  value: string;
  message: string;
}

type Param = NumberParam | StringParam | EmptyParam | ErrorParam;

const PARAMS = {
  number: (value: number): NumberParam => ({
    type: "number",
    value,
  }),
  string: (value: string): StringParam => ({
    type: "string",
    value,
  }),
  empty: (): EmptyParam => ({
    type: "empty",
    value: undefined,
  }),
  error: (value: string, message: string): ErrorParam => ({
    type: "error",
    value,
    message,
  }),
};

type ParamFunction = (params: List<Param>) => List<Param>;

export { Param, ErrorParam, PARAMS, ParamFunction };
export { NumberParam };
