import { Fxn } from "./fxn";
import { Position } from "./layout";

export interface Id {
	id: number;
}

export interface Cell extends Id {
	sheet: number;
	field: number;
	start: Position;
	end: Position;
	format?: any;
}

export interface Sheet extends Id {
	title: string;
	isVisible: boolean;
	width: number;
	height: number;
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
