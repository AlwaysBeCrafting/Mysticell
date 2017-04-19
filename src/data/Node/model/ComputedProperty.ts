import { UserNode } from './UserNode';


interface ComputedProperty extends UserNode {
	type: 'computed';
	outputNames: [string];
}

export default ComputedProperty;
