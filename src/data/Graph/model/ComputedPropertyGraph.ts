import { Graph } from './Graph';


interface ComputedPropertyGraph extends Graph {
	type: 'computed';
	outputNames: [string];
}


export { ComputedPropertyGraph };
export default ComputedPropertyGraph;
