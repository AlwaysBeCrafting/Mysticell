import { Graph } from './Graph';


interface InputPropertyGraph extends Graph {
	type: 'input';
	inputNames: [string];
}


export { InputPropertyGraph };
export default InputPropertyGraph;
