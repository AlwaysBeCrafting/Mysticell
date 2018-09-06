import { List } from "immutable";

type ValueParam = boolean | number | string;
type EmptyParam = undefined | Error;
type Param = ValueParam | EmptyParam;

type ValueParamType = "boolean" | "number" | "string";
type EmptyParamType = "undefined" | "object";
type ParamType = ValueParamType | EmptyParamType;

type ParamFunction = (params: List<Param>) => List<Param>;

export {
  ValueParam,
  EmptyParam,
  Param,
  ValueParamType,
  EmptyParamType,
  ParamType,
  ParamFunction,
};
