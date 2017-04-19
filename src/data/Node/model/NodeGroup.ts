import { UserNode } from './UserNode';


interface NodeGroup extends UserNode {
	type: 'group';
}


export { NodeGroup };
export default NodeGroup;
