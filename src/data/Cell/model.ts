import { Position } from 'common/types';


export interface Format {}


export interface Cell {
	sheet: number;
	node: number;
	start: Position;
	end: Position;
	format?: Format;
}

export default Cell;
