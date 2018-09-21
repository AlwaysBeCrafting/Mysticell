import { parse, ParsedUrlQuery } from "querystring";
import { Request } from "hapi";

import { listDocuments } from "./service";

const queryFrom = ({ query }: Request): ParsedUrlQuery =>
  typeof query === "string" ? parse(query) : query;

const handleListDocuments = (request: Request) => {
  const query = queryFrom(request);
  const limit = Number(query.limit) || undefined;
  return listDocuments(limit);
};

export { handleListDocuments };
