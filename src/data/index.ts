import { Fxn } from "./fxn";
import { Position } from "./shared";

export interface Id {
	id: number;
}

export interface Cell extends Id {
	grid: number;
	field: number;
	start: Position;
	end: Position;
	format?: any;
}

export interface Grid extends Id {
	title: string;
	isVisible: boolean;
	type: "card" | "page";
}

export interface Field extends Id {
	name: string;
	parent?: number;
	children: number[];
	expanded: boolean;
	resultNode: number;
}

export interface Node extends Id {
	label: string;
	fxn: Fxn;
	inputNodes: Array<number|undefined>;
	position: Position;
	inputValues: Array<string|number|undefined>;
	outputValue: string|number;
}
