import {Dict} from "common/types";


type Graph = Dict<Dict<Array<[number, number]>>>;

const connectedInputs = (graph: Graph, nodeId: string) => (
	Object.keys(graph)
		.filter(srcId => graph[srcId][nodeId])
		.map(srcId => graph[srcId][nodeId].map(con => con[1]))
		.reduce((prev, cur) => [...prev, ...cur], [])
);


export {connectedInputs};
