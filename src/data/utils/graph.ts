import {FormulaGraph} from "data/common";


const connectedInputs = (graph: FormulaGraph, nodeId: string) => (
	graph
		.filter(edge => edge.target === nodeId)
		.reduce((prior, edge) => [...prior, edge.edge[1]], [])
);


export {connectedInputs};
