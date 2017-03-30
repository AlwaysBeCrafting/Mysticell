import { Id } from "common/types/id";


interface NumberParam {
	type: "number";
	value: number;
}

interface StringParam {
	type: "string";
	value: string;
}

interface EmptyParam {
	type: "empty";
	value: undefined;
}

interface ArrayParam {
	type: "array";
	value: Param[];
}

export interface ErrorParam {
	type: "error";
	value: "ERR";
	message: string;
}

export type Param = NumberParam | StringParam | EmptyParam | ArrayParam | ErrorParam;


export interface NodeConnection {
	target: number | { id: number, index: number };
}


export interface NodeMember extends Id {
	node: number;
	label: string;
	inputs: Map<number, NodeConnection>;
}


export interface Node extends Id {
	name: string;
	inputNames: string[];
	outputNames: string[];
	exec: ( ...params: Param[] ) => Param[];
}

export interface NodeGroup extends Node {
	members: Map<number, NodeMember>;
}


export type Graph = Map<number, Node>;
