import { Id } from 'common/types';

import { Connection } from './Connection';


interface Member extends Id {
	node: string;
	label: string;
	inputs: Map<string, Connection>;
}


export interface UserNode extends Node {
	type: 'group' | 'input' | 'computed';
	definition: Map<string, Member>;
	outputs: Connection[];
}

export default UserNode;
