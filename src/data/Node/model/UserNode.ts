import { Id } from 'common/types';

import { ParamSource } from 'data/common';

import { Node } from './Node';


interface Member extends Id {
	node: string;
	label: string;
	inputs: ParamSource[];
}


interface UserNode extends Node {
	type: 'group' | 'input' | 'computed';
	definition: Map<string, Member>;
	outputs: ParamSource[];
}


export { UserNode };
export default UserNode;
