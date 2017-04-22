import { Id } from 'common/types';

import { Param, ParamSource } from 'data/common';


interface Node extends Id {
	definition: string; // Graph or Primitive ID
	label: string;
	inputs: ParamSource[];
	outputs: Param[];
}


interface Primitive {
	name: string;
	inputNames: string[];
	outputNames: string[];
	exec: ( ...params: Param[] ) => Param[];
}


export { Node, Primitive };
export default Node;
