import { Id } from 'common/types';

import { Connection } from 'data/common/Connection';

import { Node } from './Node';


interface Member extends Id {
	node: string;
	label: string;
	inputs: Map<string, Connection>;
}


interface UserNode extends Node {
	type: 'group' | 'input' | 'computed';
	definition: Map<string, Member>;
	outputs: Connection[];
}


export { UserNode };
export default UserNode;
