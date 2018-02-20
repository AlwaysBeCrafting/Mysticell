import { GraphCardTemplateJs } from "./Graph";
import { TableCardTemplateJs } from "./Table";

interface CommonCardTemplateJs {
  id: string;
  name: string;
  inputNames: string[];
  outputNames: string[];
}

type CardTemplateJs = GraphCardTemplateJs | TableCardTemplateJs;

export { CommonCardTemplateJs, CardTemplateJs };
