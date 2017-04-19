import { UserNode } from './UserNode';


interface InputProperty extends UserNode {
	type: 'input';
	inputNames: [string];
}

export default InputProperty;
