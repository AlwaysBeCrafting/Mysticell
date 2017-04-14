import { Id } from 'common/types';

import { Connection } from './Connection';


interface Member extends Id {
	node: number;
	label: string;
	inputs: Map<number, Connection>;
}


export interface UserNode extends Node {
	members: Map<number, Member>;
}

export default UserNode;
