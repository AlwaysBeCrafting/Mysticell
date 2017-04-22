import { Id } from 'common/types';

import { ParamSource } from 'data/common';


interface Graph extends Id {
	name: string;
	type: 'function' | 'input' | 'computed';
	inputNames: string[];
	outputNames: string[];
	nodes: string[];
	outputs: ParamSource[];
}


export { Graph };
export default Graph;
