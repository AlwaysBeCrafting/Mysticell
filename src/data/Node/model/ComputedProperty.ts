import { UserNode } from './UserNode';


interface ComputedProperty extends UserNode {
	outputNames: [string];
}

export default ComputedProperty;
