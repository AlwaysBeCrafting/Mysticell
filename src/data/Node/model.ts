interface Node {
	id: string;
	function: string;
	label: string;
	inputValues: number[];
}

interface NodeFunction {
	id: string;
	type: 'formula' | 'primitive';
	name: string;
	inputNames: string[];
	outputNames: string[];
}


export { Node, NodeFunction };
